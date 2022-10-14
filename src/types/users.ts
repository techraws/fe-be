import { Document } from "mongoose"

export interface  IUser extends Document {
  user_name: String,
  mobile_number: Number,
  user_location: String,
//   id: string;
    created_on: Date;
    updated_on: Date;
}