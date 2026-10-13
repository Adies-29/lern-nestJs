import { IsEmail, isEmpty, IsNotEmpty, IsString } from "class-validator";
import { measureMemory } from "vm";

export class ForgotPasswordDto {
    @IsEmail({}, {message: 'Format email tidak valid'})
    @IsNotEmpty({message: 'Email tidak boleh kosong'})
    readonly email:string;

}