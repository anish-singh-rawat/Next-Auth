"use client";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchUsers from "./SearchUsers";

 const getdeleteFetch = () => {
  const deleteFetch = localStorage.getItem('deleteFetch');
  if (deleteFetch) {
    return JSON.parse(deleteFetch);
  }
  else {
    return !deleteFetch;
  }
 }

  const FetchUser = () => {
  const [users, setUsers] = useState<any>([]);
  const [newEditName, setNewEditName] = useState<string>('')
  const [newEditMail, setNewEditMail] = useState<string>('')
  const [editName, setEditName] = useState<boolean>(false)
  const [editEmail, setEditEmail] = useState<boolean>(false)
  const [nameId, setNameId] = useState<string>('')
  const [emailId, setEmailId] = useState<string>('')
  const [particularId, setParticularId] = useState<string>('')
  const [deleteFetch, setDeleteFetch] = useState<boolean>(getdeleteFetch())
  const [fetchName, setFetchName] = useState<boolean>(false);
  const [fetchMail, setFetchMail] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(true);
  const [test2, setTest2] = useState<boolean>(true);
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/Getusers");
      setUsers(response.data.users);
    } 
    catch (err) {
      console.log(err);
    }
  };

  const delelteData = async (id: string) => {
    await fetch(`http://localhost:3000/api/auth/DeleteUser?id=${id}`, {
      method: 'DELETE'
    })
    setParticularId(id)
    router.refresh();
    setDeleteFetch(true);
    setTimeout(() => {
      setDeleteFetch(false);
    }, 500);
  };

  const editUserName = async (id: string, name: string, email: string) => {
    setNameId(id)
    setEditName(true)
    setNewEditName(name)
    setNewEditMail(email)
    if (editName) {
      setEditName(false)
      try {
        const res = await fetch(`http://localhost:3000/api/auth/EditUser/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newEditName, email: newEditMail }),
        });
        router.refresh();
        setFetchName(true)
        setTimeout(() => {
          setFetchName(false)
        }, 1500);
        if (!res.ok) {
          throw new Error('Failed to update topics');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const editUserEmail = async (id: string, email: string, name: string) => {
    setEmailId(id)
    setEditEmail(true)
    setNewEditMail(email)
    setNewEditName(name)
    if (editEmail) {
      setEditEmail(false)
      try {
        const res = await fetch(`http://localhost:3000/api/auth/EditUser/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newEditName, email: newEditMail }),
        });
        router.refresh();
        setFetchMail(true)
        setTimeout(() => {
          setFetchMail(false)
        }, 1500);

        if (!res.ok) {
          throw new Error('Failed to update topics');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function getPropState(users : any){
    setTest(users);
    setTest2(true)
  }

  function closeSearchUser(){
    setTest(true)
    setTest2(!test2)
  }

  useEffect(() => {
    fetchUsers();
    localStorage.setItem("deleteFetch", JSON.stringify(deleteFetch));
  }, [deleteFetch, fetchName, fetchMail]);

  return (
    <>  
    <div className="show-user-data">
      {
        !test && 
        <center>
        <div className="mt-3 font-bold text-2xl cursor-pointer" 
        onClick={closeSearchUser}>X close this tab X</div>
       </center>
      }
      <SearchUsers test={test} test2={test2} getPropState={getPropState} />
    </div>
    {
    test &&
    <div className="show-user-data">
        {
          users.length < 1 ?
            <div className="mt-52">
              <center>
                <CircularProgress />
              </center>
            </div>
            :
            <div className="h-96 overflow-y-scroll mt-2" >
              {users.slice().reverse().map((item: { _id: string, name: string, email: string, password: string }) => (
                <div key={item._id} className="flex flex-col mt-6 p-4 border rounded-md bg-gray-100">
                  <div className="flex justify-between ">
                    {
                      nameId === item._id && editName ?
                        <div>
                          <label className="mt-3 text-xl font-semibold" htmlFor="name">
                            Name :
                          </label>
                          <input className="mt-3 text-xl font-semibold" type="text"
                            onChange={(e) => setNewEditName(e.target.value)} value={newEditName} />
                        </div>
                        :
                        <div className="mt-3 text-xl font-semibold"> Name : {item.name}</div>
                    }
                    <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer" onClick={() => editUserName(item._id, item.name, item.email)}>
                      {
                        nameId === item._id && editName ? <div>submit</div> : <div>Edit </div>
                      }
                    </div>

                  </div>
                  <div className="flex justify-between">
                    {
                      emailId === item._id && editEmail ?
                        <div>

                          <label className="mt-3 text-xl font-semibold" htmlFor="email">
                            Email :
                          </label>
                          <input className="mt-3 text-xl font-semibold break-words" type="email"
                            onChange={(e) => setNewEditMail(e.target.value)}
                            value={newEditMail} />
                        </div>
                        :
                        <div className="mt-3 text-xl font-semibold break-words">Email : {item.email}</div>
                    }

                    <div className="mt-3 text-xl font-semibold bg-orange-400 border rounded-md cursor-pointer" onClick={() => editUserEmail(item._id, item.email, item.name)} >
                      {
                        emailId === item._id && editEmail ? <div>submit</div> : <div>Edit </div>
                      }
                    </div>
                  </div>
                  <center>
                    <div className="mt-4 bg-orange-700 rounded-md p-2 cursor-pointer"
                      onClick={() => delelteData(item._id)} >
                      {
                        particularId === item._id && deleteFetch == true ?
                          <CircularProgress />
                          :
                          <div> Delete User </div>
                      }
                    </div>
                  </center>
                </div>
              ))}
            </div>
        }
      </div>
    }
    
      
    </>
  );
};

export default FetchUser;

