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

const ChatPopup = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]); // Store chat messages
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState([]); // Store multiple attached files
  const [filePreviews, setFilePreviews] = useState([]); // Store previews of files (for images)
  const [uploadProgress, setUploadProgress] = useState([]); // Track file upload progress for multiple files
  const [isUploading, setIsUploading] = useState(false); // Track if files are uploading
  const textareaRef = useRef(null); // Reference to the textarea for dynamic resizing
  const recognitionTimeout = useRef(null); // For handling the delay to send the message
  const [recognition, setRecognition] = useState(null); // Speech recognition instance

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

  // Adjust the height of the textarea dynamically based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSendMessage = () => {
    if (message.trim() || files.length > 0) {
      const newMessage = { text: message.trim(), files: filePreviews };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
      setFiles([]); // Clear the files array after sending
      setFilePreviews([]); // Clear file previews
      setUploadProgress([]); // Clear the upload progress array
      setIsUploading(false); // Stop the loading indicator
      clearTimeout(recognitionTimeout.current);
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
    <div className="flex flex-col h-full w-full">
      <div className="flex-grow p-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className="mb-2 bg-line p-2 rounded-lg lg:w-2/3 w-full ml-auto"
          >
            {/* Display the uploaded files */}
            {msg.files && msg.files.length > 0 && (
              <div className="mb-2">
                {msg.files.map((file, idx) => (
                  <div key={idx} className="mb-1">
                    {file.url ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="max-w-xs rounded-lg mb-1"
                      />
                    ) : (
                      <span className="text-gray-700">{file.name}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Display the text message */}
            <div>{msg.text}</div>
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
      </div>

      <div className="flex flex-col p-2 w-full mb-4 relative">
        <div className="flex items-center border border-line-400 rounded-full p-2 w-full mx-auto relative">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full relative">
            <label htmlFor="file-upload" className="cursor-pointer">
              <FontAwesomeIcon icon={faPaperclip} className="text-primary" />
              <input
                id="file-upload"
                type="file"
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
                {" "}
                {/* Added space between elements */}
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 pl-4 ml-4" // Added `ml-4` for left margin
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

            <textarea
              ref={textareaRef}
              placeholder="Ask a question or make a request"
              className="flex-grow mx-4 text-gray-500 focus:outline-none resize-none overflow-hidden rounded-md p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={1} // Initial number of rows, adjusts dynamically
              style={{ minHeight: "40px", maxHeight: "150px" }}
            />
          </div>

          <div
            className={`flex items-center justify-center w-10 h-10 bg-green-100 rounded-full ${
              isRecording ? "bg-red-100" : ""
            }`}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            <FontAwesomeIcon
              icon={faMicrophone}
              className={`text-primary ${isRecording ? "text-red-500" : ""}`}
            />
          </div>
          <div
            className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full ml-2"
            onClick={handleSendMessage}
          >
            <FontAwesomeIcon icon={faPlay} className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
