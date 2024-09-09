"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Buttons";

const SignUp: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system theme preference
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    // Update theme on change
    darkModeMediaQuery.addEventListener("change", (e) => {
      setIsDarkMode(e.matches);
    });

    // Clean up listener on component unmount
    return () => {
      darkModeMediaQuery.removeEventListener("change", (e) => {
        setIsDarkMode(e.matches);
      });
    };
  }, []);

  return (
    <div
      className={`w-full p-4 sm:p-0 flex items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-gray-100"
        } border border-gray-300 rounded-none`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            className="p-2 border border-gray-300 text-black bg-transparent focus-within:outline-none"
          />
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 text-black bg-transparent focus-within:outline-none"
          />
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-300 text-black bg-transparent focus-within:outline-none"
          />
          <Button type="primary" className="mt-4">
            Signup
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Already have an account? Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
