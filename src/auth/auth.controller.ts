import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dtos/register.dto';
import { LocalAuthGuard } from './loaclAuthGuard';
import RequestObjWithUser from './RequestWithUser.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}


    @Post('register')
    async register(@Body() registerData: RegisterDto) {
        return this.authService.registerUser(registerData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('log-in')
    async login(@Req() request: RequestObjWithUser) {
        const user = request.user;
        user.password = undefined;
        return user;
    }
}
