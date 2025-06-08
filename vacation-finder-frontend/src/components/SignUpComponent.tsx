import { useState, type SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import { Navigate, NavLink } from "react-router-dom";

type SignUpProps = {
  authService: AuthService;
  setUserNameCb: (userName: string) => void;
};

export default function SignUpComponent({
  authService,
  setUserNameCb,
}: SignUpProps) {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous errors

    if (!userName || !email || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const signUpResponse = await authService.signUpAndSignIn(
        userName,
        email,
        password
      );

      if (signUpResponse) {
        setUserNameCb(userName); // Set username in parent app state
        setSignupSuccess(true);
      } else {
        // This 'else' might be hit if login fails post-signup
        setErrorMessage(
          "Signup successful, but auto-login failed. Please try logging in."
        );
      }
    } catch (error: any) {
      // Catch errors thrown by AuthService.signUpAndSignIn (e.g., username exists, invalid password format)
      console.error("Signup error:", error);
      setErrorMessage(
        error.message || "An unexpected error occurred during signup."
      );
    }
  };

  function renderErrorMessage() {
    if (errorMessage) {
      return (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {errorMessage}
        </p>
      );
    }
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 p-4 sm:p-6 lg:p-8">
      {signupSuccess && <Navigate to="/spaces" replace={true} />}{" "}
      {/* Redirect to /spaces after successful signup */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="userName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
            />
          </div>
          {renderErrorMessage()}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              Log in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
