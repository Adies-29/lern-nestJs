import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty({message: 'Token tidak boleh kosong'})
    @IsString()
    readonly token: string;

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