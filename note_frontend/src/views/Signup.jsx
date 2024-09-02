import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import server from "../server/server";

export default function Signup() {
  const refname = useRef(null);
  const refemail = useRef(null);
  const refpassword = useRef(null);

  const [createFailed, setCreateFailed] = useState(false);

  const navigate = useNavigate();

  const locationUrl = useLocation();

  useEffect(() => {
    if (locationUrl.search.includes("error")) {
      setCreateFailed(true);
    } else {
      setCreateFailed(false);
    }
  }, [locationUrl]);

  document.title = "Signup - SaralNotes";

  const onSubmit = (form) => {
    form.preventDefault();

    server.post("register", {
      name: refname.current.value,
      email: refemail.current.value,
      password: refpassword.current.value,
    }).then((reponse) => {
      navigate("/login?user_created");
    }).catch((response) => {
      navigate("/signup?failed");
    })

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
          Signup new account
        </h2>
        {
          createFailed && <div className="mt-4" role="alert">
          <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Singup failed
          </div>
          <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Something went wrong.</p>
          </div>
        </div>
        }
        
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Your name
            </label>
            <div className="mt-2">
              <input
                id="name"
                ref={refname}
                name="name"
                type="text"
                autoComplete="email"
                required=""
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                ref={refemail}
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
                ref={refpassword}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required=""
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create account
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have a account?
          <NavLink className="text-blue-700 font-bold" to="/login"> Login</NavLink>
        </p>
      </div>
    </div>

  );
}