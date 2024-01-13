import { connect } from "@/database/mongo.config";
import ErrorReporter from "@/validator/ErrorReporter";
import { loginSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/model/User";

connect();
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();    
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);
    const user =  await User.findOne({email : output.email })
    if (user) {
        const checkPassword = bcrypt.compareSync(output.password!, user.password)
        if (checkPassword) {
            return NextResponse.json({
                status : 200,
                message : "user Login successful"
            },{status : 200})
        }
        return NextResponse.json({
            status : 400,
            errors : {
              password : "password incorrect"
            }
        },{
            status : 200
        })
    }
    else{
        return NextResponse.json({
            status : 400,
            errors :{
               email : "Invalid email please make registration first"
            }
        })
    }
  } 
  catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors : error.messages},
        { status: 200 }
      );
    }
  }
}
