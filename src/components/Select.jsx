import React, { useId } from "react";

// Select component using forwardRef for external ref access
function Select({ options, label, classname = "", ...props }, ref) {
  // useId is used to generate a unique ID for the select input and its label
  const id = useId();

  return (
    <div className="w-full">
      {/* If a label is provided, render it and link it to the select using htmlFor */}
      {label && <label htmlFor={id} className="">{label}</label>}

      {/* Select dropdown element */}
      <select
        {...props} // Spread other props like onChange, value, etc.
        id={id} // Assign unique id for accessibility
        ref={ref} // Attach forwarded ref
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none
             focus:bg-gray-50 duration-200 border 
             border-gray-200 w-full ${classname}`} // Merge default styles with any custom class
      >
        {/* Dynamically render all options */}
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

// Export the component using React.forwardRef to allow ref forwarding
export default React.forwardRef(Select);
