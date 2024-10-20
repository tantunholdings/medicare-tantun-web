"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Import js-cookie to manage cookies

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false); // State for new password requirement
  const [session, setSession] = useState(""); // State for storing session information
  const router = useRouter();

  const handleLogin = async (loginPassword) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/token?username=${encodeURIComponent(username)}&password=${encodeURIComponent(loginPassword)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const data = await response.json(); // Get the response data first

      if (response.ok && !data.challenge_name) {
        // Successful login, set cookies and redirect
        Cookies.set("authToken", data.access_token, {
          expires: 1,
          sameSite: "strict",
          path: "/",
        });
        router.push("/admin");
      } else {
        // Handle error responses
        if (data?.challenge_name === "NEW_PASSWORD_REQUIRED") {
          setIsNewPasswordRequired(true); // Prompt for new password
          setSession(data.session); // Capture and store the session information
          setErrorMessage(""); // Clear any previous error message
        } else {
          // Handle other errors
          const errorMessages = Array.isArray(data.detail)
            ? data.detail.map(err => err.msg).join(", ")
            : String(data.detail); // Convert to string if it's not an array
          setErrorMessage(errorMessages || "An unexpected error occurred."); // Set the error message
        }
      }
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);
    }
  };

  const handleNewPassword = async () => {
    console.log(session);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FASTAPI_URL}/new-password?username=${encodeURIComponent(username)}&new_password=${encodeURIComponent(newPassword)}&session=${encodeURIComponent(session)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.ok) {
        setPassword(newPassword); // Update the password state
        setNewPassword(""); // Clear the new password state

        await handleLogin(newPassword); // Attempt to login again with the new password
      } else {
        const errorData = await response.json();
        const errorMessages = Array.isArray(errorData.detail)
          ? errorData.detail.map(err => err.msg).join(", ")
          : String(errorData.detail);
        setErrorMessage(errorMessages || "Failed to change password."); // Set the error message
      }
    } catch (error) {
      setErrorMessage("Failed to change password: " + error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      

      {isNewPasswordRequired ? (
        <>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleNewPassword}
            className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
          >
            Set New Password
          </button>
        </>
      ) : (<>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded"
      />
      <button
        onClick={() => handleLogin(password)} // Pass the current password for login
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        Login
      </button>
      </>)}
    </div>
  );
}
