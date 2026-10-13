import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register-dto.js';
import { UserEntity } from './entities/user-entity.js';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-dto.js';
import { HashingUtil } from './common/utils/hasing.util.js';
import { ForgotPasswordDto } from './dto/forgot-password-dto.js';
import { ResetPasswordDto } from './dto/reset-password-dto.js';





@Injectable()
export class AuthService {

    private users: UserEntity[] = [];
    private idCounter = 1;

    constructor(private jwtService: JwtService){}

    async register(dto: RegisterDto): Promise<UserEntity> {
        // cek email sudah terdaftar?
        const existingUser = this.users.find((u) => u.email === dto.email);
        if (existingUser) {
            throw new ConflictException(`Alamat email ${dto.email} sudah digunakan`);
        }

        // hashing kata sandi
        const hash = await HashingUtil.hash(dto.password);

        const payload = { 
            id: this.idCounter,
            email: dto.email 
        };

        const generatedToken = await this.jwtService.signAsync(payload);

        //Buat entitas baru agar decorator class-transformer aktif
        const newUser = new UserEntity({
            id: this.idCounter++,
            name: dto.name,
            email: dto.email,
            password: hash,
            token: generatedToken
            
        });

        this.users.push(newUser);
        return newUser;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.users;
    }

    // fungsi login
    async login(dto: LoginDto){
        const users =this.users.find((u) => u.email === dto.email);
        if (!users){
            throw new UnauthorizedException('Email atau password salah');
        }

        //cocokan password
        const isPasswordMatch = await HashingUtil.compare(dto.password, users.password);

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Email atau password salah');
        }

        const payload = {
            id : users.id,
            email : users.email, 
        };

        //kirim jwt
        return{
            message: 'Login berhasil',
            token : await this.jwtService.signAsync(payload),
        };
    }

    //forgot password
    async forgotPassword(dto: ForgotPasswordDto){
        // cari user dari email
        const user = this.users.find((u) => u.email === dto.email);
        if(!user) {
            throw new NotFoundException('Email tidak ditemukan');
        }

        // payload khusus untuk reset password
        const payload = { email: user.email, purpose: 'reset-password' };

        //token JWT
        const Token_reset = await this.jwtService.signAsync(payload, { expiresIn: '10m'});

        return {
            message: 'Jika email Anda terdaftar, instruksi reset telah dikirim.',
            simulated_email_content: `Klik tautan ini untuk reset: http://localhost:3000/auth/reset-password?token=${Token_reset}`,
            token_resetPass: Token_reset 
        };

    }

    async resetPassword(dto: ResetPasswordDto){
        //cek password sama
        if(dto.password !== dto.password_confirm){
            throw new NotFoundException('Password dan password confirm tidak cocok')
        }

        try {
            //verifikasi JWT
            const paylod = await this.jwtService.verifyAsync(dto.token, {
                secret: process.env.JWT_SECRET,
            });

            // verifikasi token ini digunakan untuk reset password
            if(paylod.purpose !== 'reset-password') {
                throw new BadRequestException('Token tidak valid untuk aksi reset password');
            }

            // cari user berdasarkan email
            const userIndex = this.users.findIndex((u) => u.email === paylod.email)
            if(userIndex === -1){
                throw new BadRequestException('user tidak ditemukan');
            }

            const newHashPassword = await HashingUtil.hash(dto.password);
            
            this.users[userIndex].password = newHashPassword;

            return {
                message: 'Password berhasil diubah. Silakan login dengan password baru.',
            };
        } catch (error) {
            throw new BadRequestException('Token tidak valid atau sudah kedaluwarsa');
        }
    }

}
