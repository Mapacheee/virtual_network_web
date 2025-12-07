import { Injectable, UnauthorizedException } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
    constructor(
        private studentService: StudentService,
        private adminService: AdminService,
    ) { }

    async validateStudent(email: string) {
        return this.studentService.findByEmail(email);
    }

    async registerStudent(data: any) {
        return this.studentService.create(data);
    }

    async validateAdmin(username: string, pass: string) {
        const admin = await this.adminService.findByUsername(username);
        if (admin && admin.password === pass) {
            const { password, ...result } = admin;
            return result;
        }
        return null;
    }

    async loginAdmin(user: any) {
        return {
            access_token: 'mock_token',
            user,
        };
    }
}
