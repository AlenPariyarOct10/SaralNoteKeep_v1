import React from "react";
import { useAuth } from "../contexts/AuthContext";



export default function Logout()
{
    const {logout} = useAuth();
    logout();    
}