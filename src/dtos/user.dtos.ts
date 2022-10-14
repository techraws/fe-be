import { IsEmail, IsString, IsInt } from "class-validator";

export class CreateUsersDto  {

    @IsString()
    public user_name: string;

    @IsString()
    public email: string;

    @IsInt()
    public mobile_number: number;

    // @IsInt()
    // public updated_on: number;

    @IsString()
    public user_location: string;

}