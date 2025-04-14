import React, { useId } from "react";

// Creating a reusable Input component with support for ref using forwardRef
const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", id, ...props }, // Props from parent
  ref // Ref passed from parent
) {
  // Generate a unique ID for input if not provided
  const generatedId = useId();
  const inputId = id || generatedId; // Use provided id or the generated one

  return (
    <div className="w-full">
      {/* If label is provided, show label */}
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={inputId}>
          {label}
        </label>
      )}

      {/* Input element with styling */}
      <input
        type={type} // Input type (text, email, password, etc.)
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // Tailwind CSS classes
        ref={ref} // Forwarded ref from parent
        {...props} // Spread any other props like value, onChange, placeholder, etc.
        id={inputId} // Set unique id for input
      />
    </div>
  );
});

export default Input; // Export the component so it can be used in other files
