import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";
import { NextResponse } from "next/server";

connect();
export async function PUT(request : NextResponse, { params } : any) {
    try {
        // const { id } = params;
        // const { name, email } = await request.json();
        // await User.findByIdAndUpdate(id, { name, email });
        return NextResponse.json({ message: 'User updated Successfully' }, { status: 200 });
    } catch (error) {
        console.error(error, 'dddddddddddd', { error: error });
        return NextResponse.json({ message: 'Error updating User' }, { status: 500 });
    }
}