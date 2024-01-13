import Logout from "@/components/Logout";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if(!session){
    redirect('/auth/login')
  }
  
  return (
    <>
    <div>
      <div className="flex justify-center items-center h-screen flex-col">
        <h1 className="bg-purple-500  text-3xl font-bold mb-6">
          hello User welcome to your personal account and your website !
        </h1>
        <div> {JSON.stringify(session)} </div>
      <Logout/>
      </div>
    </div>
    </>
    )
}
