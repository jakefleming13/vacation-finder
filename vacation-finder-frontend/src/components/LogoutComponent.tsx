import { Navigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { useState } from "react";

interface LogoutComponentProps {
  authService: AuthService;
  setUserNameCb: (name: string | undefined) => void;
}

export default function LogoutComponent({
  authService,
  setUserNameCb,
}: LogoutComponentProps) {
  const [logoutSuccess, setLogoutSuccess] = useState<boolean>(false);

  const LogoutButton = () => {
    const handleLogout = async () => {
      await authService.logout();
      setUserNameCb(undefined); // Clear userName after logout
      setLogoutSuccess(true);
    };

    return (
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-semibold"
      >
        Logout
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white p-4 sm:p-6 lg:p-8">
      {logoutSuccess && <Navigate to="/" replace={true} />}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Are you sure you want to logout?
        </h2>
        <LogoutButton />
      </div>
    </div>
  );
}
