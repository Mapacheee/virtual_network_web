import { Controller, Post, Body, UnauthorizedException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('student/login')
    async studentLogin(@Body() body: { email: string }) {
        const student = await this.authService.validateStudent(body.email);
        if (!student) {
            return { needsRegistration: true };
        }
        return student;
    }

    @Post('student/register')
    @UseInterceptors(FileInterceptor('photo', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    async studentRegister(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
        if (file) {
            body.photoUrl = `http://localhost:3000/uploads/${file.filename}`;
        }
        return this.authService.registerStudent(body);
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
