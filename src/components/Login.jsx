import React, { useState } from 'react'
// For navigating between pages
import { Link, useNavigate } from 'react-router-dom'
// To dispatch actions to Redux store
import { useDispatch } from 'react-redux'
// To manage form data easily
import { useForm } from 'react-hook-form'
// Login action to update Redux state
import { login as authLogin } from '../store/authSlice'
// Auth service to handle login with Appwrite
import authService from '../appwrite/auth'
// Reusable UI components
import { Button, Input, Logo } from './index'

function Login() {
  const navigate = useNavigate()         // Used for programmatic navigation
  const dispatch = useDispatch()         // Used to dispatch Redux actions
  const { register, handleSubmit } = useForm() // Register inputs and handle form submission
  const [error, setError] = useState("") // Store any login error message

  // Function to handle login logic
  const login = async (data) => {
    setError("") // Clear previous errors
    try {
      // Call Appwrite login with form data
      const session = await authService.login(data)
      if (session) {
        // If login successful, fetch user details
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData)) // Store user data in Redux
        navigate("/") // Redirect to home page
      }
    } catch (error) {
      // If login fails, show error message
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-700 to-black px-4">
      <div className="w-full max-w-md bg-gray-900/90 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 shadow-2xl text-white transition-all duration-500 hover:scale-105">
        
        {/* Logo at the top */}
        <div className="flex justify-center mb-4">
          <div className="w-24">
            <Logo width="100%" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2 text-white">Sign in to your account</h2>
        
        {/* Link to Signup page */}
        <p className="text-center text-sm text-gray-400 mb-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline font-medium transition">
            Sign Up
          </Link>
        </p>

        {/* Show error if any */}
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        {/* Login form */}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
          
          {/* Email input */}
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            className="bg-gray-800/80 border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-300"
            {...register("email", {
              required: true, // Required field
              validate: {
                matchPattern: (value) =>
                  // Validate email format
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />

          {/* Password input */}
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            className="bg-gray-800/80 border border-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-300"
            {...register("password", { required: true })}
          />

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 font-semibold py-3 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login // Exporting Login component
