import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('student/login')
    async studentLogin(@Body() body: { email: string; name: string }) {
        return this.authService.validateStudent(body.email, body.name);
    }

    @Post('admin/login')
    async adminLogin(@Body() body: { username: string; pass: string }) {
        const user = await this.authService.validateAdmin(body.username, body.pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        return this.authService.loginAdmin(user);
    }
}
