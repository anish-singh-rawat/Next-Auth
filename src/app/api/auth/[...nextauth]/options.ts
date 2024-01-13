import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/database/mongo.config";
import { User } from "@/model/User";
export const authOptions : AuthOptions = {
    pages :{
        signIn : '/Login'
    },
    providers: [
        CredentialsProvider({
            name : "next-auth",
            credentials: {
                email : {
                    label : "email",
                    type : 'email',
                    placeholder : "Please enter your email"
                },
                password : {
                    label : "password",
                    type : 'password',
                }
            },
            async authorize(credentials , req){
                connect()
                const user = await User.findOne({email: credentials?.email});
                if (user) {
                    return user
                  } 
              else {
                    return null
                  }
            }
        })
    ],
  }
  