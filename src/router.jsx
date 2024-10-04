import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./layout/MainLayout";
import Details from "./pages/Details";
import Cart from "./pages/Cart";
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
      {
        path: "cart",
        element: <Cart />,
        loader: () => {
          if (!localStorage.getItem("token")) {
            return redirect("/login");
          }
          return null;
        },
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
