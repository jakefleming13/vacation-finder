// import { NavLink } from "react-router-dom";

// type NavBarProps = {
//   userName: string | undefined;
// };
// export default function NavBar({ userName }: NavBarProps) {
//   function renderLoginLogout() {
//     if (userName) {
//       return (
//         <NavLink to="/logout" style={{ float: "right" }}>
//           {userName}
//         </NavLink>
//       );
//     } else {
//       return (
//         <NavLink to="/login" style={{ float: "right" }}>
//           Login
//         </NavLink>
//       );
//     }
//   }

//   return (
//     <div className="navbar">
//       <NavLink to={"/"}>Home</NavLink>
//       <NavLink to={"/profile"}>Profile</NavLink>
//       <NavLink to={"/spaces"}>Vacations</NavLink>
//       <NavLink to={"/createSpace"}>Create Vacation</NavLink>
//       {renderLoginLogout()}
//     </div>
//   );
// }
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png"; // Import your logo image

type NavBarProps = {
  userName: string | undefined;
};

export default function NavBar({ userName }: NavBarProps) {
  function renderLoginLogout() {
    if (userName) {
      return (
        <NavLink
          to="/logout"
          className="py-2 px-4 text-white hover:text-blue-300 transition-colors duration-200"
        >
          {userName}
        </NavLink>
      );
    } else {
      return (
        <NavLink
          to="/login"
          className="py-2 px-4 text-white hover:text-blue-300 transition-colors duration-200"
        >
          Login
        </NavLink>
      );
    }
  }

  return (
    <nav className="bg-gray-800 p-4 shadow-md rounded-md">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0 text-white mr-2">
          <NavLink to="/" className="flex items-center">
            <img src={Logo} alt="JF Logo" className="h-10 w-auto rounded-md" />
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="flex-grow flex items-center justify-center space-x-6 md:space-x-8">
          <NavLink
            to="/"
            className="text-white hover:text-blue-300 transition-colors duration-200 text-lg font-medium"
          >
            Home
          </NavLink>
          <NavLink
            to="/spaces"
            className="text-white hover:text-blue-300 transition-colors duration-200 text-lg font-medium"
          >
            Vacations
          </NavLink>
          <NavLink
            to="/createSpace"
            className="text-white hover:text-blue-300 transition-colors duration-200 text-lg font-medium"
          >
            Create Vacation
          </NavLink>
        </div>

        {/* Login/Logout Section */}
        <div>{renderLoginLogout()}</div>
      </div>
    </nav>
  );
}
