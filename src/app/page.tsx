"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import FetchUser from "./FetchUser";
import { CircularProgress} from "@mui/material";
import Logout from "@/components/Logout";
import axios from "axios";
import AddUsers from "./pages/AddUsers/page";

interface User {
  name: string;
  email: string;
}

const getshowFecthUsers =()=>{
  const showFecthUsersData = localStorage.getItem("showFecthUsers")
  if (showFecthUsersData) {
    return JSON.parse(showFecthUsersData);
  } else {
    return true;
  }
}
export default function Home() {
  const [user, setUser] = useState<any>([]);
  const { data: session, status } = useSession();
  const [showFecthUsers, setShowFecthUsers] = useState<boolean>(getshowFecthUsers())
  const router = useRouter();
  useEffect(() => {
    axios.get("http://localhost:3000/api/auth/Getusers").then((response) => {
      setUser(response.data.users.length);
    });
    const fetchData = async () => {
      const userSession = await getSession();
      if (!userSession) {
        router.push("/auth/login");
      }
    };
    fetchData();
    localStorage.setItem('showFecthUsers', JSON.stringify(showFecthUsers));
  }, [router,showFecthUsers]);

  if (status === "loading") {
    return (
      <center className="mt-64">
        <CircularProgress />
      </center>
    );
  }

  if (!session) {
    return (
      <center className="mt-64">
        <CircularProgress />
      </center>
    );
  }
  const currentUserArr: User[] = Object.values(session);

  // useEffect(()=>{
  //   localStorage.setItem('showFecthUsers', JSON.stringify(showFecthUsers));
  // },[showFecthUsers])

  return (
    <>
      <div className="mt-6">
        <div className="flex justify-center items-center flex-col">
          <h1 className="bg-purple-500  text-3xl font-bold mb-6">
            Welcome in Admin page
          </h1>
          <div className="font-bold">
            Hello MR &nbsp; : &nbsp; &nbsp; {currentUserArr[0].name}
            <br />
            Email ID &nbsp; &nbsp; : &nbsp; &nbsp; {currentUserArr[0].email}
            <br />
            Total user : &nbsp; &nbsp; {user}
          </div>

          <div className="flex justify-between w-96">
            <div className="bg-orange-300 rounded-md p-2 mt-4 cursor-pointer"
            onClick={()=>setShowFecthUsers(!showFecthUsers)}  >
             {
              showFecthUsers ? <div>  Add User </div> :  <div> showUsers</div> 
             }
            </div>
            <Logout />
          </div>
          </div>
          {
            showFecthUsers ? 
            <FetchUser />
            : 
            <AddUsers/>
          }
      </div>
    </>
  );
}
