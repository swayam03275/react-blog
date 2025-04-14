import React, { useState } from "react";
import authService from "../appwrite/auth.js"; // Custom Appwrite auth service
import { Link, useNavigate } from "react-router-dom"; // Navigation and links
import { login } from "../store/authSlice.js"; // Redux login action
import { Button, Input, Logo } from "./index.js"; // Reusable components
import { useDispatch } from "react-redux"; // For dispatching Redux actions
import { useForm } from "react-hook-form"; // For managing form state

function Signup() {
  const navigate = useNavigate(); // Hook to redirect to routes
  const [error, setError] = useState(""); // Error state
  const dispatch = useDispatch(); // To dispatch Redux login action
  const { register, handleSubmit } = useForm(); // Form hooks

  // Create user account handler
  const create = async (data) => {
    setError(""); // Clear previous errors
    try {
      const userData = await authService.createAccount(data); // Create account
      if (userData) {
        const user = await authService.getCurrentUser(); // Fetch current user
        if (user) dispatch(login(user)); // Dispatch to Redux store
        navigate("/"); // Navigate to homepage
      }
    } catch (error) {
      setError(error.message); // Show any error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-black p-4">
      <div className="w-full max-w-md rounded-2xl bg-gray-900/90 backdrop-blur-lg border border-gray-700 p-8 shadow-2xl transition-all duration-500 text-white hover:scale-105">
        
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 text-white drop-shadow-sm">
          Sign up to create account
        </h2>

        {/* Link to login */}
        <p className="text-sm text-center text-gray-400 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline font-medium transition duration-300"
          >
            Sign In
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-5">

          {/* Full Name */}
          <Input
            type="text"
            placeholder="Enter your full name"
            {...register("name", { required: true })} // Validation for name
            className="bg-gray-800/80 border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-300"
          />

          {/* Email */}
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
            className="bg-gray-800/80 border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-300"
          />

          {/* Password */}
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })} // Validation for password
            className="bg-gray-800/80 border border-gray-700  placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-300"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
