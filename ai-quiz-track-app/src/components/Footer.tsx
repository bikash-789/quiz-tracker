import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="row-start-3 w-full flex flex-col gap-4 items-center justify-center p-4 border-t text-white bg-gray-900">
      <div className="flex gap-6">
        <a href="#privacy" className="hover:opacity-80">
          Privacy Policy
        </a>
        <a href="#terms" className="hover:opacity-80">
          Terms of Service
        </a>
      </div>
      <p className="text-sm">&copy; 2024 AIQuizTrack. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
