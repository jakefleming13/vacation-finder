import "./App.css";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import LoginComponent from "./components/LoginComponent";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import VacationSpace from "./components/vacations/CreateVacation";
import Vacations from "./components/vacations/Vacations";
import LogoutComponent from "./components/LogoutComponent";
import HomeComponent from "./components/HomeComponent";
import SignUpComponent from "./components/SignUpComponent";

const authService = new AuthService();
const dataService = new DataService(authService);

function App() {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar userName={userName} />
          <Outlet />
        </>
      ),
      children: [
        {
          path: "/",
          element: <HomeComponent />,
        },
        {
          path: "/login",
          element: (
            <LoginComponent
              authService={authService}
              setUserNameCb={setUserName}
            />
          ),
        },
        {
          path: "/profile",
          element: <div>Profile page</div>,
        },
        {
          path: "/signup",
          element: (
            <SignUpComponent
              authService={authService}
              setUserNameCb={setUserName}
            />
          ),
        },
        {
          path: "/createSpace",
          element: <VacationSpace dataService={dataService} />,
        },
        {
          path: "/spaces",
          element: <Vacations dataService={dataService} />,
        },
        {
          path: "/logout",
          element: (
            <LogoutComponent
              authService={authService}
              setUserNameCb={setUserName}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <div className="wrapper">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
