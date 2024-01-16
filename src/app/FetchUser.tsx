"use client";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const FetchUser = () => {
  const [users, setUsers] = useState<any>([]);
  const [test, setTest] = useState<boolean>(false)
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false)
  const router = useRouter();
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/Getusers");
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  const delelteData = async (id : string)=>{

    const res =  await fetch(`http://localhost:3000/api/auth/DeleteUser?id=${id}`,{
        method : 'DELETE'
    })
    setTest(true);
    setTimeout(() => {
      setTest(false);
    }, 1000);
    if (res.ok) {
      setDeleteLoader(true);
      setTimeout(() => {
        setDeleteLoader(false);
      }, 1000);
        router.refresh();
    }
}

  useEffect(() => {
    fetchUsers();
  }, [test]);

  return (
    <>
      <div>
        {
          users.length <1 ?  
          <div className="mt-52">
            <center>
            <CircularProgress/>
            </center>
          </div>
         :
         <div className="h-96 overflow-y-scroll mt-5" >
              {users.slice().reverse().map((item: { _id: string, name: string, email: string, password : string }) => (
            <div key={item._id} className="flex flex-col mt-6 p-4 border rounded-md bg-gray-100">
              <div className="flex justify-between ">
              <div className="mt-3 text-xl font-semibold">Name : {item.name}</div>
              <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">Edit</div>
              </div>
              <div className="flex justify-between">
              <div className="mt-3 text-xl font-semibold break-words">Email : {item.email}</div>
              <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer">Edit</div>
              </div>
              <center> 
                  <div className="mt-4 bg-orange-700 rounded-md p-2 cursor-pointer"
                  onClick={()=> delelteData(item._id)} >
                    {
                     deleteLoader == true ? 
                  <CircularProgress/>
                  :
                   <div> Delete User </div>
                  }
                  </div>
             </center>
            </div>
  )) }
          </div>
        }
      </div>
    </>
  );
};

export default FetchUser;
