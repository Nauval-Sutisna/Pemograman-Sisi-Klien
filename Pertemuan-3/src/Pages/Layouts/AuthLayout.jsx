import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-6">{children}</div>
    </div>
  );
};

export default AuthLayout;
