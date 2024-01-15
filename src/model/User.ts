import mongoose,  { Schema } from "mongoose";
const userSchema = new Schema({
    name : {
        require : [true, "name is required"],
        type : Schema.Types.String,
    },
    email : {
        require : [true, "email is required"],
        type : Schema.Types.String,
        unique : true,  
        trim : true
    },
    password : {
        require : [true, "email is required"],
        type : Schema.Types.String,
    },
    role : {
        type : String,
        default : 'user'
      }
})

export const User : any =  mongoose.models.User ||  mongoose.model("User", userSchema);