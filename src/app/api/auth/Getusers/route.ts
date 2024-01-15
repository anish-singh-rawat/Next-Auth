
import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";
import { NextResponse } from "next/server";

connect();
export async function GET(request: any, response: any) {
    try {
        const users = await User.find();
        return NextResponse.json(
            {users},
            {status: 200}
            );       
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json({
            status : 500,
            errors : {
              password : "some error occured while trying to fetch the users "
            }
        },{
            status : 500
        })
    }
}

