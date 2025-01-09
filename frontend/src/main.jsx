import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import { LayOut, RequireAuth } from "./pages/Layout/LayOut";
// import LayOut from "./pages/Layout/LayOut";
import ListPage from "./pages/ListPage/ListPage";
import SinglePage from "./pages/SinglePage/SinglePage";
// import Profile from "./pages/Profile/profile";
import Register from "./pages/regiaster/REgister";
import Login from "./pages/Login/Login";
import { AuthContextProvider } from "./lib/Context/AuthContext"; // Use the provider component
import UpdateProfilePage from "./pages/Profile/UpdateProfilePage";
import NewPostPage from "./pages/newPostPage/newPostPage";
import Profile from "./pages/Profile/Profile";

import { listPageLoader, profileLoader, SinglePageLoader } from "./lib/Loader/singlePageLoader";
import { SocketContextProvider } from "./lib/Context/SocketContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayOut />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/list",
        element: <ListPage></ListPage>,
        loader: listPageLoader
      },
      // {
      //   path: "/profile",
      //   element: <Profile></Profile>,
      // },
      {
        path: ":id",
        element: <SinglePage />, // Component to render
        loader: SinglePageLoader, // Function to load data
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

    ],
  },
  {
    path: "/",
    element: <RequireAuth></RequireAuth>,
    children: [
      {
        path: "/profile",
        element: <Profile></Profile>,
        loader: profileLoader
      },
      {
        path: "/profile/updateprofile",
        element: <UpdateProfilePage></UpdateProfilePage>

      },
      {
        path: "/add",
        element: <NewPostPage></NewPostPage>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider> {/* Wrap with the context provider */}

    </AuthContextProvider>
  </React.StrictMode>
);