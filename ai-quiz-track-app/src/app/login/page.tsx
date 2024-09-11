import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div
      className={`w-full p-4 sm:p-0 flex items-center justify-center h-full dark:bg-gray-900 dark:text-white bg-white text-black`}
    >
      <LoginForm />
    </div>
  );
}
