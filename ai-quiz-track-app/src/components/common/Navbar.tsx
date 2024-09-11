"use client";
import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full flex justify-between items-center py-4 border-b bg-gray-900 text-white">
      <div className="text-2xl font-bold gradient-text gradient-text-hover px-2">
        AIQuizTrack
      </div>
      {/* Hamburger Icon */}
      <div className="block lg:hidden pr-2">
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className="text-white"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
      {/* Navigation Menu */}
      <nav
        className={`lg:flex lg:gap-4 lg:items-center lg:bg-transparent bg-gray-900 text-white lg:w-auto fixed pr-3 lg:relative w-full h-screen lg:h-auto top-0 left-0 lg:top-auto lg:left-auto transition-transform ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:gap-4 gap-6 p-4 lg:p-0 lg:space-x-4">
          <a
            href="/"
            className="hover:opacity-80 transition-opacity"
            aria-current="page"
          >
            Home
          </a>
          <a href="/login" className="hover:opacity-80 transition-opacity">
            Login
          </a>
          <a
            href="/create-quiz"
            className="hover:opacity-80 transition-opacity"
          >
            Create Quiz
          </a>
          <a href="/take-quiz" className="hover:opacity-80 transition-opacity">
            Take Quiz
          </a>
          <a href="/profile" className="hover:opacity-80 transition-opacity">
            Profile
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
