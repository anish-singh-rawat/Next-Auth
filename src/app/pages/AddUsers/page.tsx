"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/navigation";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUsers() {
  const router = useRouter();
  const [authState, setAuthstate] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<registerationErroType>({});

  const submitForm = async () => {
    setLoading(true);
      axios.post("/api/auth/Register", authState)
        .then((res) => {
          setLoading(false);
          const response = res.data;
          if (response.status === 200) {
           toast.success(" User Create successfully ")
           setErrors({});
           setAuthstate({name: "",
           email: "",
           password: "",
           password_confirmation: ""})

          } else if (response?.status === 400) {
            setErrors(response?.errors);
          }
        })
      .catch((err: any) => {
        setLoading(false);
        console.log("some error occured : ", err);
      });
  };
  return (
    <section>
        <ToastContainer/>
      <div className="flex items-center justify-center mt-4">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Create Users here
          </h2>
          <center>  
            <AddCircleIcon className="w-12 h-12 cursor-pointer"/>
          </center>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label  htmlFor="name"
                  className="text-base font-medium text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"  id="name"   placeholder="Full Name" 
                    value={authState.name}
                    onChange={(e) => setAuthstate({ ...authState, name: e.target.value })  } ></input>
                  <span className="text-red-500">{errors?.name}</span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email" value={authState.email}  placeholder="Email"  id="email"
                    onChange={(e) =>  setAuthstate({ ...authState, email: e.target.value }) } ></input>
                  <span className="text-red-500">{errors?.email}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
               <label htmlFor="password" className="text-base font-medium text-gray-900">
                   Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password" value={authState.password}
                    placeholder="Password"
                    id="password"
                    onChange={(e) =>
                      setAuthstate({ ...authState, password: e.target.value })
                    }
                  ></input>
                  <span className="text-red-500">{errors?.password}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    confirm Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password" value={authState.password_confirmation}
                    placeholder="Password"
                    id="password"
                    onChange={(e) =>
                   setAuthstate({ ...authState, password_confirmation: e.target.value,})}>
                   </input> 
                 </div>
              </div>
              <div>
                <center>
                {
                  loading ? 
                  <CircularProgress/>
                  :
                  <button type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80" onClick={submitForm} >
                  Create Account
                </button>
                }

                </center>
                <center>
                 <Link href="/"  className="inline-flex mt-3 w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                  Go back
                </Link>
                </center>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
          </div>
        </div>
      </div>
    </section>
  );
}
