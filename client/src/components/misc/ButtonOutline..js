import React from "react";

const ButtonOutline = ({ children, className = "" }) => {
  return (
    <button
      className={`font-medium tracking-wide py-2 px-5 sm:px-8 border border-primary-500 text-primary-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-primary-500 hover:text-white-500 transition-all hover:shadow-primary-500 ${className}`}
    >
      {" "}
      {children}
    </button>
  );
};

export default ButtonOutline;
