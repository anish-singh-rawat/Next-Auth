import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import FetchUser from "./FetchUser";

export default async function Home() {
  interface User {
    name: string;
    email: string;
  }
  const session = await getServerSession(authOptions);
  const curentUser = JSON.stringify(session);
  const currentUserObj = JSON.parse(curentUser);
  const currentUserArr: User[] = Object.values(currentUserObj);
  console.log(session,'ddddddd');
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <div className="mt-6">
        <div className="flex justify-center items-center flex-col">
          <h1 className="bg-purple-500  text-3xl font-bold mb-6">
            Welcome in Admin page
          </h1>
          <div className="font-bold">
            Hello MR : {currentUserArr[0].name}
            <br />
            Email ID : {currentUserArr[0].email}
          </div>
          <Logout />
          <div className="h-96 overflow-y-scroll mt-5">
            <FetchUser />
          </div>
        </div>
      </div>
    </>
  );
}
