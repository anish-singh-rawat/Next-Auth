"use client";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FetchUser = () => {
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/Getusers");
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        {
          users.length <1 ?  
          <div className="mt-52">
            <CircularProgress/> 
          </div>
         :
         <div className="h-96 overflow-y-scroll mt-5" >
              {  users.map((item: { _id: string, name: string, email: string, password : string }) => (
            <div key={item._id} className="flex flex-col mt-6 p-4 border rounded-md bg-gray-100">
              <div className="flex justify-between ">
              <div className="mt-3 text-xl font-semibold">Name : {item.name}</div>
              <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">Edit</div>
              </div>
              <div className="flex justify-between">
              <div className="mt-3 text-xl font-semibold">Email : {item.email}</div>
              <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">Edit</div>
              </div>
            </div>
                    )) }
          </div>
        }
      </div>
    </>
  );
};

export default FetchUser;
