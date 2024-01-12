import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : AuthOptions = {
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
                const user = { id: "1", name: "Anish singh rawat", 
                email: credentials?.email }
                if (user) {
                    return user
                  } else {
                    return null
                  }
            }
        })
    ],
  }
  