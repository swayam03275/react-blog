import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Importing authentication service
import authService from "./appwrite/auth";
// Importing actions to update Redux store
import { login, logout } from "./store/authSlice";
// Importing layout components
import { Footer, Header } from "./components";
// Importing Outlet to render child routes
import { Outlet } from "react-router-dom";

function App() {
  // State to track loading during authentication check
  const [loading, setLoading] = useState(true);
  // Redux dispatch hook
  const dispatch = useDispatch();

  // On component mount, check if user is logged in
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData })); // If user exists, log them in
        } else {
          dispatch(logout()); // If not, ensure logged out
        }
      })
      .finally(() => setLoading(false)); // Turn off loading state
  }, []);

  // UI while loading authentication state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-indigo-200">
        <p className="text-xl text-gray-800 animate-pulse font-medium">Loading your experience...</p>
      </div>
    );
  }

  // Main layout after loading
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 text-gray-900">
      {/* Site header */}
      <Header />

      {/* Main content area */}
      <main className="flex-grow px-4 py-6 md:px-8 max-w-6xl mx-auto w-full">
        <Outlet /> {/* Renders child route content */}
      </main>

      {/* Site footer */}
      <Footer />
    </div>
  );
}

export default App;
