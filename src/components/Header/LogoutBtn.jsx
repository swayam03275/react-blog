import React from "react";
// Hook to dispatch actions to Redux store
import { useDispatch } from "react-redux";
// Importing authentication service with logout function
import authService from "../../appwrite/auth";
// Importing logout action to update Redux state
import { logout } from "../../store/authSlice";


function LogoutBtn() {
  // Creating dispatch function to send actions to Redux
  const dispatch = useDispatch();

  // Function to handle logout
  const logoutHandler = () => {
    // Calling logout function from authService (Appwrite)
    authService.logOut().then(() => {
      // After successful logout, update Redux state
      dispatch(logout());
    });
  };

  return (
    // Logout button with styling
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler} // Call logoutHandler when button is clicked
    >
      LogOut
    </button>
  );
}

export default LogoutBtn; // Exporting the component so it can be used in other files
