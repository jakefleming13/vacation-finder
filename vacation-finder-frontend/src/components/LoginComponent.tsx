// import { useState, type SyntheticEvent } from "react";
// import { AuthService } from "../services/AuthService";
// import { Navigate } from "react-router-dom";

// type LoginProps = {
//   //authservice to check credentials
//   authService: AuthService;
//   //Sends the value of the username to the outer application
//   setUserNameCb: (userName: string) => void;
//   //Allows child components to send data to parents
// };

// export default function LoginComponent({
//   authService,
//   setUserNameCb,
// }: LoginProps) {
//   const [userName, setUserName] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

//   const handleSubmit = async (event: SyntheticEvent) => {
//     event.preventDefault();
//     if (userName && password) {
//       const loginResponse = await authService.login(userName, password);
//       const userName2 = authService.getUserName();
//       if (userName2) {
//         setUserNameCb(userName2);
//       }
//       console.log(loginResponse);
//       if (loginResponse) {
//         setLoginSuccess(true);
//       } else {
//         setErrorMessage("invalid credentials");
//       }
//     } else {
//       setErrorMessage("UserName and password required!");
//     }
//   };

//   function renderLoginResult() {
//     if (errorMessage) {
//       return <label>{errorMessage}</label>;
//     }
//   }

//   return (
//     <div role="main">
//       {loginSuccess && <Navigate to="/profile" replace={true} />}
//       <h2>Please login</h2>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <label>User name</label>
//         <input value={userName} onChange={(e) => setUserName(e.target.value)} />
//         <br />
//         <label>Password</label>
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//         />
//         <br />
//         <input type="submit" value="Login" />
//       </form>
//       <br />
//       {renderLoginResult()}
//     </div>
//   );
// }
import { useState, type SyntheticEvent } from "react";
import { AuthService } from "../services/AuthService";
import { Navigate, NavLink } from "react-router-dom"; // Import NavLink for the Sign up link

type LoginProps = {
  //authservice to check credentials
  authService: AuthService;
  //Sends the value of the username to the outer application
  setUserNameCb: (userName: string) => void;
  //Allows child components to send data to parents
};

export default function LoginComponent({
  authService,
  setUserNameCb,
}: LoginProps) {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (userName && password) {
      const loginResponse = await authService.login(userName, password);
      const userName2 = authService.getUserName();
      if (userName2) {
        setUserNameCb(userName2);
      }
      console.log(loginResponse);
      if (loginResponse) {
        setLoginSuccess(true);
      } else {
        setErrorMessage("Invalid credentials"); // Capitalized for consistency
      }
    } else {
      setErrorMessage("Username and password required!"); // Capitalized for consistency
    }
  };

  function renderLoginResult() {
    if (errorMessage) {
      return (
        <p className="text-red-500 text-sm mt-2" role="alert">
          {" "}
          {/* Added Tailwind classes for error message */}
          {errorMessage}
        </p>
      );
    }
    return null; // Return null if no error
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white p-4 sm:p-6 lg:p-8 ">
      {" "}
      {/* Full height (minus navbar), centered, background */}
      {loginSuccess && <Navigate to="/spaces" replace={true} />}{" "}
      {/* Redirect to /spaces (Vacations) which is more typical after login than /profile */}
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-800">
        {" "}
        {/* White box, rounded corners, shadow, max width */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {" "}
          {/* Added spacing between form elements */}
          <div>
            <label
              htmlFor="userName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              id="userName" // Added ID for accessibility
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your username"
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
              id="password" // Added ID for accessibility
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          {renderLoginResult()} {/* Display error message here */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/" // Assuming you'll create a /signup route
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
