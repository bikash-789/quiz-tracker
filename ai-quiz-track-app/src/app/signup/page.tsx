"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const SignUp: React.FC = () => {
  return (
    <div
      className={`w-full p-4 sm:p-0 flex items-center justify-center h-full dark:bg-gray-900 dark:text-white bg-white text-black`}
    >
      <div
        className={`w-full max-w-md p-6 dark:bg-black bg-gray-100 border border-gray-300 rounded-none`}
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
            className="p-2 border border-gray-300 text-black dark:text-white bg-transparent focus-within:outline-none"
          />
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-300 text-black dark:text-white bg-transparent focus-within:outline-none"
          />
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="p-2 border border-gray-300 text-black dark:text-white bg-transparent focus-within:outline-none"
          />
          <Button type="button" className="mt-4">
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
