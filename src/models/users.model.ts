import { model, Mongoose, Schema } from "mongoose"
import { ObjectID } from 'typeorm';
import { IUser } from "../types/users"

const userSchema: Schema = new Schema(
  {
    // _id:{
    //     type: ObjectID
    // },
     user_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: Number,
      required: true,
    },

    user_location: {
      type: String,
      required: true,

    },
    updated_on:{
        type: Date
    },
    created_on:{
     type: Date
    }
     
  }
);

export default model<IUser>("users", userSchema)