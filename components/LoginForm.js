'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';  // Import js-cookie to manage cookies

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      
      // Store the JWT token in cookies
      Cookies.set('token', data.access_token, {
        expires: 1,  // Set the cookie expiration (1 day in this case)
        secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
        sameSite: 'strict',
        path: '/',
      });

      router.push('/admin');  // Redirect to home page after login
    } else {
      setErrorMessage('Login failed');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        Login
      </button>
    </div>
  );
}
