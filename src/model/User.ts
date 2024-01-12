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
    }
})

export const User : any = mongoose.model.User || mongoose.model("User ", userSchema);
