import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./views/DefaultLayout";
import GuestLayout from "./views/GuestLayout";
import Notes from "./views/Notes";
import Login from "./views/Login";
import Signup from "./views/Signup";
import React from "react";
import Logout from "./views/Logout";

 const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: "/notes",
                element: <Notes />,
            },
            {
                path: "/logout",
                element: <Logout/>,
            }
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ]
    },
]);

export default router;