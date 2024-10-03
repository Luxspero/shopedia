import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: "/",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default router;
export { router };
