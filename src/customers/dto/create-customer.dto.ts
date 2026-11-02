import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCusotmerDto {
    @IsNotEmpty({message: 'name harus diisi!'})
    @IsString()
    readonly name:string;
    
    @IsNotEmpty({message: 'email harus diisi!'})
    @IsEmail({},{message: 'format email tidak valid'})
    readonly email:string;
    
    @IsNotEmpty({message: 'phonre harus diisi!'})
    @IsString()
    readonly phone:string;

}