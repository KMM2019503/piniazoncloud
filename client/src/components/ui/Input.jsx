import React from "react";
import PropTypes from "prop-types";

const Input = React.forwardRef(({ icon: Icon, ...props }, ref) => {
  return (
    <div className="relative mb-6 font-sans">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-6 text-secondary-light" />
      </div>
      <input
        ref={ref} // Forward the ref to the input element
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-20 rounded-xl border border-gray-600 text-white placeholder-gray-400 transition focus:ring-1"
      />
    </div>
  );
});

Input.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

// Adding a display name for better debugging
Input.displayName = "Input";

export default Input;
