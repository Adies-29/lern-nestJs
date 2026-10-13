import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({message: 'Email tidak boleh kosong'})
    @IsEmail({}, {message: 'Format email tidak valid'})
    readonly email:string;

    @IsNotEmpty({message: 'Pawword tidak boleh kosong'})
    @IsString()
    readonly password:string;
}