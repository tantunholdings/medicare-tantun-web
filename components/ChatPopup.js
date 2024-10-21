"use client"; // Ensure this is a client-side component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faMicrophone,
  faPlay,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons"; // Add faSpinner for loading icon
import { useState, useEffect, useRef } from "react";
import Card from "./Card"; // Import the Card component from the new file

import "./main.css";

const ChatPopup = () => {
  const [message, setMessage] = useState(""); // Removed default from initialMessage
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState([]); // Store multiple attached files
  const [filePreviews, setFilePreviews] = useState([]); // Store previews of files (for images)
  const [uploadProgress, setUploadProgress] = useState([]); // Track file upload progress for multiple files
  const [isUploading, setIsUploading] = useState(false); // Track if files are uploading
  const [loadingResponse, setLoadingResponse] = useState(false); // Track if waiting for a response
  const textareaRef = useRef(null); // Reference to the textarea for dynamic resizing
  const recognitionTimeout = useRef(null); // For handling the delay to send the message
  const [recognition, setRecognition] = useState(null); // Speech recognition instance

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = "en-US";

        recognitionInstance.onresult = (event) => {
          const speechToText = event.results[0][0].transcript;
          setMessage((prevMessage) => prevMessage + " " + speechToText);
        };

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error: ", event.error);
          setIsRecording(false);
        };

        recognitionInstance.onend = () => {
          setIsRecording(false);
          if (message.trim()) {
            recognitionTimeout.current = setTimeout(() => {
              handleSendMessage();
            }, 3000);
          }
        };

        setRecognition(recognitionInstance); // Set recognition instance in state
      }
    }
  }, [message]);

  const handleCardClick = (question) => {
    handleSendMessage(question);
  };

  // Adjust the height of the textarea dynamically based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSendMessage = async (msg) => {
    const userMessage = message || msg;
    console.log("Sending message:", userMessage);
    if (userMessage.trim() || files.length > 0) {
      const newMessage = {
        text: userMessage.trim(),
        files: filePreviews,
        isFromBackend: false,
      };

      // Append the user's message to the chat
      setChatMessages([...chatMessages, newMessage]);

      // Immediately clear the input fields (message and files)
      setMessage(""); // Clear the message after sending
      setFiles([]); // Clear the files array after sending
      setFilePreviews([]); // Clear file previews
      setUploadProgress([]); // Clear the upload progress array
      setIsUploading(false); // Stop the loading indicator
      clearTimeout(recognitionTimeout.current); // Clear the timeout

      // Start loading indicator for response
      setLoadingResponse(true);

      // Prepare form data for the API call
      const formData = new FormData();
      formData.append("question", userMessage.trim());
      formData.append("previous_messages", JSON.stringify(chatMessages));

      // If there are files, append them
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]); // Append each file individually
        }
      }

      try {
        // Send API call to the backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FASTAPI_URL}/ask-question`,
          {
            method: "POST",
            body: formData,
          }
        );

        // Handle the API response
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        let backendMessage = {
          text: "",
          isFromBackend: true,
        };

        if (data.is_valid) {
          backendMessage = {
            text: data.response_from_openai,
            isFromBackend: true,
          };
        } else {
          backendMessage = {
            text: "I'm sorry, I don't understand that question.",
            isError: true,
            isFromBackend: true,
          };
        }

        setChatMessages((prevMessages) => [...prevMessages, backendMessage]);
      } catch (error) {
        console.error("Error sending message:", error);
        // Optionally, append an error message to the chat
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Failed to get a response from the server.",
            isError: true,
            isFromBackend: true,
          },
        ]);
      } finally {
        // Stop loading indicator for response
        setLoadingResponse(false);
      }
    }
  };

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...selectedFiles];
    const updatedPreviews = [...filePreviews];
    setIsUploading(true); // Start the loading indicator

    selectedFiles.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          updatedPreviews.push({ name: file.name, url: event.target.result });
          setFilePreviews([...updatedPreviews]); // Store image previews
        };
        reader.readAsDataURL(file); // Read image file for preview
      } else {
        updatedPreviews.push({ name: file.name });
        setFilePreviews([...updatedPreviews]); // Store other file names
      }
    });

    setFiles(updatedFiles); // Append new files to existing files
    simulateFileUpload(selectedFiles); // Simulate file upload progress for new files
  };

  const simulateFileUpload = (selectedFiles) => {
    const newProgress = Array(selectedFiles.length).fill(0);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const updatedProgress = prevProgress.map((progress, index) =>
          progress >= 100 ? 100 : progress + 10
        );
        if (updatedProgress.every((progress) => progress >= 100)) {
          clearInterval(interval);
          setIsUploading(false); // Stop loading when all files are uploaded
        }
        return updatedProgress;
      });
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default action of Enter (newline)
      handleSendMessage();
    }
  };

  const handleStartRecording = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    recognition.start();
    setIsRecording(true);
    clearTimeout(recognitionTimeout.current);
  };

  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleFileDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = filePreviews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setFilePreviews(updatedPreviews);
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <div>
        {/* Carousel for small screens */}
        <div className="block md:hidden">
          <div className="carousel flex overflow-x-scroll snap-x snap-mandatory gap-4 mb-6 scrollbar-hide">
            <div className="flex-shrink-0 w-64 snap-center">
              <Card
                title="Company Search"
                description="Which company is providing the best Services?"
                onClick={() =>
                  handleCardClick(
                    "Which company is providing the best services?"
                  )
                }
              />
            </div>
            <div className="flex-shrink-0 w-64 snap-center">
              <Card
                title="Policy Guidance"
                description="What type of insurance is right for me?"
                onClick={() =>
                  handleCardClick("What type of insurance is right for me?")
                }
              />
            </div>
            <div className="flex-shrink-0 w-64 snap-center">
              <Card
                title="Premium Estimates"
                description="How much will I need to pay?"
                onClick={() => handleCardClick("How much will I need to pay?")}
              />
            </div>
          </div>
        </div>

        {/* Grid for medium and larger screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card
            title="Company Search"
            description="Which company is providing the best Services?"
            onClick={() =>
              handleCardClick("Which company is providing the best services?")
            }
          />
          <Card
            title="Policy Guidance"
            description="What type of insurance is right for me?"
            onClick={() =>
              handleCardClick("What type of insurance is right for me?")
            }
          />
          <Card
            title="Premium Estimates"
            description="How much will I need to pay?"
            onClick={() => handleCardClick("How much will I need to pay?")}
          />
        </div>
      </div>

      <div className="flex-grow p-4 space-y-2">
        {" "}
        {/* Added space between messages */}
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={msg.isFromBackend ? "flex" : "flex justify-end"}
          >
            {msg.isFromBackend ? (
              <img
                src="/assets/inschat.png"
                alt="Inschat"
                className="flex-shrink-0 w-10 h-10 rounded-full mr-1"
              />
            ) : null}

            {/* Aligns each message to the right */}
            <div
              className={
                (msg.isFromBackend ? "bg-gray-100" : "bg-gray-200") +
                " p-2 rounded-lg max-w-full lg:max-w-2/3 break-words"
              }
            >
              {" "}
              {/* Added break-words */}
              {/* Display the uploaded files */}
              {msg.files && msg.files.length > 0 && (
                <div className="mb-2 flex justify-end">
                  {msg.files.map((file, idx) => (
                    <div key={idx} className="mb-1">
                      {file.url ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="max-w-xs rounded-lg mb-1"
                        />
                      ) : (
                        <span
                          className={
                            msg.isFromBackend
                              ? "text-gray-100"
                              : "text-gray-700"
                          }
                        >
                          {file.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Display the text message */}
              <div className="whitespace-pre-wrap break-words">
                {msg.text}
              </div>{" "}
              {/* Added break-words here too */}
            </div>
            {!msg.isFromBackend ? (
              <img
                src="/assets/guestchat.png"
                alt="Inschat"
                className="flex-shrink-0 w-10 h-10 rounded-full ml-1"
              />
            ) : null}
          </div>
        ))}
        {/* Show loading icon if uploading */}
        {isUploading && (
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-primary animate-spin"
            />
          </div>
        )}
        {/* Show loading icon while waiting for API response */}
        {loadingResponse && (
          <div className="flex justify-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-primary animate-spin"
              size="2x"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full mb-4 relative">
        <div className="flex items-center border border-line-400 rounded-3xl p-2 w-full mx-auto relative">
          {/* Paperclip Button */}
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full flex-shrink-0">
            <label htmlFor="file-upload" className="cursor-pointer">
              <FontAwesomeIcon
                icon={faPaperclip}
                className="text-primary text-lg sm:text-sm"
              />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleFileUpload}
              />
            </label>
          </div>
          <div className="flex-grow flex flex-col">
            {/* Show uploaded files with delete button inside input area */}
            {files.length > 0 && (
              <div className="flex flex-wrap mt-2 space-x-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 pl-4 ml-4"
                  >
                    <span className="mr-2">{file.name}</span>
                    <button
                      onClick={() => handleFileDelete(index)}
                      className="text-red-500"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Small progress bar, sticking to file upload button */}
            {files.length > 0 &&
              uploadProgress.some((progress) => progress < 100) && (
                <div className="absolute bottom-[-8px] left-0 w-full">
                  <div className="w-10 bg-gray-200 rounded-full h-1 mx-auto">
                    <div
                      className="bg-blue-600 h-1 rounded-full"
                      style={{
                        width: `${Math.min(...uploadProgress)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

            {/* Text Input */}
            <textarea
              ref={textareaRef}
              placeholder="Ask ..."
              className="flex-grow text-gray-500 focus:outline-none resize-none overflow-hidden p-2 w-full sm:w-3/4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1} // Initial number of rows, adjusts dynamically
              style={{ minHeight: "40px", maxHeight: "200px" }}
            />
          </div>

          {/* Microphone Button */}
          <div
            className={`flex items-center justify-center w-10 h-10 mx-2 bg-green-100 rounded-full flex-shrink-0 ${
              isRecording ? "bg-red-100" : ""
            }`}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              className={`text-primary text-lg sm:text-sm ${
                isRecording ? "text-red-500" : ""
              }`}
            />
          </div>

          {/* Send Button */}
          <div
            className={
              "flex items-center justify-center w-10 h-10  rounded-full flex-shrink-0 " +
              (message
                ? "cursor-pointer bg-green-100"
                : "cursor-not-allowed bg-gray-50")
            }
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon
              icon={faPlay}
              className={
                "text-lg sm:text-sm" +
                (message ? " text-primary" : " text-gray-300")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
