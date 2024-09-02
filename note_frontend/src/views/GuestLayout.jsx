import { Outlet } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import React from "react";
export default function GuestLayout() {
    const { user, token } = useAuth();
    console.log(user, token);

    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
}