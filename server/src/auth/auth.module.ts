import { Module } from '@nestjs/common';
import { StudentModule } from '../student/student.module';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [StudentModule, AdminModule],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
