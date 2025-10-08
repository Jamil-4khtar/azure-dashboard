"use client"
import React, { useEffect } from 'react';
import { IoIosCloseCircle, IoMdClose } from 'react-icons/io';

export const Toast = ({ message, type = 'error', onClose }) => {
  useEffect(() => {
    // Automatically close the toast after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed top-5 left-[50%] -translate-x-[50%] z-50 w-full max-w-sm transform-gpu transition-transform duration-300 ease-in-out"
      role="alert"
    >
      <div className="flex items-start rounded-lg border border-white/20 bg-black/20 p-4 m-4 text-white shadow-lg backdrop-blur-lg">
        <div className="flex-shrink-0">
          {/* Step 2: Use the imported Error Icon component */}
          <IoIosCloseCircle className="h-6 w-6 text-red-400" />
        </div>
        <div className="ml-3 flex-1 pt-0.5">
          <p className="text-sm font-semibold">Authentication Error</p>
          <p className="mt-1 text-sm text-gray-200">{message}</p>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            onClick={onClose}
            className="inline-flex rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Close</span>
            {/* Step 3: Use the imported Close Icon component */}
            <IoMdClose className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};