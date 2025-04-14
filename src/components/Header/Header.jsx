import React from 'react'
// Importing components from the index file
import { Container, Logo, LogoutBtn } from '../index'
// Importing Link component to navigate between routes
import { Link } from 'react-router-dom'
// To get data from Redux store
import { useSelector } from 'react-redux'
// To navigate programmatically
import { useNavigate } from 'react-router-dom'

function Header() {
  // Getting authentication status from Redux store
  const authStatus = useSelector((state) => state.auth.status)
  // Hook to navigate to different routes
  const navigate = useNavigate()

  // Array of navigation items (menu)
  const navItems = [
    {
      name: 'Home',      // Menu name
      slug: "/",         // URL path
      active: true       // Always visible
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,  // Show only if user is not logged in
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,  // Show only if user is not logged in
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,   // Show only if user is logged in
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,   // Show only if user is logged in
    },
  ]

  return (
    // Header section with padding, shadow, and background color
    <header className='py-4 shadow-md bg-gradient-to-r from-gray-600 to-gray-700 text-white'>
      {/* Wrapper container to center content */}
      <Container>
        {/* Navigation bar */}
        <nav className='flex items-center justify-between'>
          {/* Logo on the left */}
          <div className='flex items-center'>
            <Link to='/'>
              <Logo width='80px' /> {/* Site logo */}
            </Link>
          </div>

          {/* Navigation menu on the right */}
          <ul className='flex items-center gap-4'>
            {/* Loop through navItems array and show buttons if active */}
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)} // Go to the route when clicked
                    className='px-5 py-2 rounded-full bg-white text-gray-800 font-medium hover:bg-blue-500 hover:text-white transition-all duration-300'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {/* Show Logout button only if user is logged in */}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header // Exporting Header component so it can be used in other files
