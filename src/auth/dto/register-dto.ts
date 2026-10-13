import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Name wajib diisi' })
    @IsString()
    @MinLength(3, { message: 'Nama minimal 3 karakter' })
    @MaxLength(100)
    readonly name: string;

    @IsNotEmpty({ message: 'Email wajib diisi' })
    @IsEmail({}, { message: 'Format email tidak valid' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password wajib diisi' })
    @IsString()
    @MinLength(8, { message: 'Password minimal 8 karakter' })
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password terlalu lemah: wajib memuat kombinasi huruf besar, huruf kecil, dan angka',})
    password: string;

    @IsNotEmpty({ message: 'Password confirm wajib diisi' })
    @IsString()
    readonly password_confirm: string;
}