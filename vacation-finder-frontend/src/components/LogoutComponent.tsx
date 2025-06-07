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

    return <button onClick={handleLogout}>Logout</button>;
  };

  return (
    <div role="main">
      {logoutSuccess && <Navigate to="/" replace={true} />}
      <h2>Logout</h2>
      <LogoutButton />
    </div>
  );
}
