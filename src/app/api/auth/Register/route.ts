import { connect } from "@/database/mongo.config";
import ErrorReporter from "@/validator/ErrorReporter";
import { registerSchema } from "@/validator/authSchema";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt from 'bcrypt'
import {User} from "@/model/User";

connect();
export async function POST(request:NextRequest) {
    try {
        const body  = await request.json();
        const validator = vine.compile(registerSchema)
        validator.errorReporter = () => new ErrorReporter()
        const output = await validator.validate(body);
        //* check that the email is already exis
        const user =  await User.findOne({email : output.email })
        if (user) {
            return NextResponse.json({
                status : 400,
                errors :{
                    email : "Email already exists"
                }
            },{status : 200})
        }

        //* Encrypt the password
        // else{   
            const salt = bcrypt.genSaltSync(10)
            output.password = bcrypt.hashSync(output.password, salt);
            await User.create(output)
            return NextResponse.json(
            {status:200 , message : "User created successfully, Please login to your account... "}, 
            {status: 200})
        // }
    } catch (error) {
        if(error instanceof errors.E_VALIDATION_ERROR){
            return NextResponse.json(
            {status : 400, errors : error.messages},
            {status: 200})
        }
    }
}