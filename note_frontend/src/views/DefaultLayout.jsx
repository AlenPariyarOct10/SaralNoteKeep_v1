import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import { Button, Popconfirm } from 'antd';

export default function DefaultLayout() {

    const { user, token } = useAuth();
    console.log(user, token);

    const navigate = useNavigate();

    if (!token) {
        return <Navigate to='/login' />
    }

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-8 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0">
                                <h1 className="text-white text-2xl font-bold">🗒️SaralNotes</h1>
                            </div>
                            <div className="sm:ml-6 sm:block">
                                <div className="flex space-x-4">

                                    <NavLink className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                        aria-current="page" to="/notes">Notes</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <div className="text-white">{user ? user.name : '..loading'}</div>
                            
                            <Popconfirm
                                title="Are you sure to logout ?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={()=>{
                                    navigate("/logout");
                                }}
                            >
                                <Button className="m-3" type="primary" danger>Logout</Button>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}