import { IsEmail, IsNotEmpty, IsString, MinLength,  } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @MinLength(4, {message: "Password must be atleast 4 character!"})
    password: string
}