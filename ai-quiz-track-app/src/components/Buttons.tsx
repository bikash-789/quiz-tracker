import React from "react";

interface ButtonProps {
  type: "primary" | "secondary" | "danger";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  children,
  className = "",
}) => {
  const getButtonClasses = () => {
    let baseClasses =
      "border-2 px-6 py-3 uppercase transition-colors duration-300 ease-in-out ";

    switch (type) {
      case "primary":
        return `${baseClasses} border-black text-black bg-white dark:border-white dark:text-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-gray-800 ${className}`;
      case "secondary":
        return `${baseClasses} border-gray-500 text-gray-700 bg-gray-200 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 ${className}`;
      case "danger":
        return `${baseClasses} border-red-500 text-red-700 bg-red-200 dark:border-red-400 dark:text-red-300 dark:bg-red-900 hover:bg-red-300 dark:hover:bg-red-800 hover:text-red-900 dark:hover:text-red-100 ${className}`;
      default:
        return `${baseClasses} ${className}`;
    }
  };

  return (
    <button onClick={onClick} className={getButtonClasses()}>
      {children}
    </button>
  );
};

export default Button;
