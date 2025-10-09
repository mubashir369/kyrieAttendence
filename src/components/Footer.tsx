'use client'
import React, { useState, useEffect } from 'react';

// Utility function to format the time
// FIXED: Parameter 'date' is explicitly typed as Date
const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export default function Footer() {
  // State to hold the current formatted time
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    // Set up an interval to update the time every 1000 milliseconds (1 second)
    const timerId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Enhanced: Stronger background, top border for separation, and a subtle shadow.
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 border-t border-gray-200 dark:border-gray-700 shadow-lg mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm">
        
        {/* Left Section: Live Time and Copyright */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-6 items-center">
          
          {/* Display the live updating time - Styled as a badge/pill */}
          <div className="bg-white dark:bg-gray-800 p-2 px-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
            <span className="font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {currentTime}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-0">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
        
        {/* Right Section: Links */}
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <a 
            href="/privacy" 
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ease-in-out font-medium"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 ease-in-out font-medium"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
