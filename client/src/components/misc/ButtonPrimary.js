import React from "react";

const ButtonPrimary = ({ children, addClass, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        "py-2 px-6 lg:py-4 lg:px-16 text-white-500 font-semibold rounded-lg bg-primary-500 hover:shadow-black-500-md transition-all outline-none " +
        addClass
      }
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
