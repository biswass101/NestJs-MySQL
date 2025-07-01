import { IsEmail } from "class-validator";

export class ForgotPassowrdDto {

    @IsEmail()
    email: string;
}