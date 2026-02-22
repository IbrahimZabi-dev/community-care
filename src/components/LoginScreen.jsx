import React from 'react';

export default function LoginScreen({
  clientUsername,
  setClientUsername,
  handleClientLogin,
  setCurrentView,
}) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome to CommunityCare
          </h2>
          <p className="text-gray-600">
            Please enter a username to get started
          </p>
        </div>
        <input
          type="text"
          value={clientUsername}
          onChange={(e) => setClientUsername(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleClientLogin()}
          placeholder="Enter your username"
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleClientLogin}
          disabled={!clientUsername.trim()}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Continue
        </button>
        <div className="mt-4 text-center">
          <button
            onClick={() => setCurrentView('caseworker')}
            className="text-sm text-blue-600 hover:underline"
          >
            Staff Login →
          </button>
        </div>
      </div>
    </div>
  );
}
