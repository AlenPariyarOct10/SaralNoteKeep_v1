import React, { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import server from "../server/server";
import { Alert, Spin } from "antd";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const emailref = useRef(null);
  const passwordref = useRef(null);
  const { login, token, user } = useAuth();

  const [userCreated, setUserCreated] = useState(false);

  const currentLocation = useLocation();

  
  useEffect(() => {
    if (currentLocation.search.includes("user_created")) {
      setUserCreated(true);
    } else {
      setUserCreated(false);
    }
    
  }, [currentLocation]);


  document.title = "Signin - SaralNotes";

  const onSubmit = async (form) => {
    form.preventDefault();
    setLoading(true);

    try {
      await login(emailref.current.value, passwordref.current.value);
      setLoading(false);

    } catch (error) {
      setError(error.message);

      setLoading(false);
    }

  }

  if (token && user) {
    return <Navigate to="/notes" />;
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 w-full justify-center">
            <h1 className="text-blue-600 text-3xl font-bold">🗒️SaralNotes</h1>
          </div>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        {userCreated &&<div className="mt-4" role="alert ">
          <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
            Please sign in to continue
          </div>
          <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
            <p>Your account is created succesfully ✅</p>
          </div>
        </div>}
        
      </div>




      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {
          error && <Alert
            message="Error"
            description={error.response.data.error}
            type="error"
            showIcon
          />
        }
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                ref={emailref}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>

            </div>
            <div className="mt-2">
              <input
                ref={passwordref}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required=""
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >

              {(loading) ? <Spin /> : "Sign in"}
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Create a new account ?
          <NavLink className="text-blue-800 font-bold hover:underline" to="/signup"> Signup</NavLink>
        </p>
      </div>
    </div>

  );
}