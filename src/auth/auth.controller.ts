import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register-dto.js';
import { UserEntity } from './entities/user-entity.js';
import { LoginDto } from './dto/login-dto.js';
import { ResetPasswordDto } from './dto/reset-password-dto.js';
import { ForgotPasswordDto } from './dto/forgot-password-dto.js';


@Controller('auth')
export class AuthController {

    constructor(private  readonly authService: AuthService){}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto:RegisterDto): Promise<UserEntity>{
        return this.authService.register(registerDto);
    }

    @Get()
    async getAllUser(): Promise<UserEntity[]>{
        return this.authService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() logindto: LoginDto){
        return this.authService.login(logindto);
    }

    @Post('forgot-password')
    async forgotpassword(@Body() forgotpasswordDto: ForgotPasswordDto){
        return this.authService.forgotPassword(forgotpasswordDto);
    }

    @Post('reset-password')
    async resetpassword(@Body() resetpasswordDto: ResetPasswordDto){
        return this.authService.resetPassword(resetpasswordDto);
    }
}
