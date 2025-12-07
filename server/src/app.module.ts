import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { CoursesModule } from './courses/courses.module';
import { SimulationsModule } from './simulations/simulations.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { Student } from './student/entities/student.entity';
import { Course } from './courses/entities/course.entity';
import { Simulation } from './simulations/entities/simulation.entity';
import { Admin } from './admin/entities/admin.entity';
import { AdminService } from './admin/admin.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Student, Course, Simulation, Admin],
      synchronize: true,
    }),
    StudentModule,
    CoursesModule,
    SimulationsModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly adminService: AdminService) { }

  async onModuleInit() {
    const admin = await this.adminService.findByUsername('admin');
    if (!admin) {
      await this.adminService.create({ username: 'admin', password: 'adminpassword' });
    }
  }
}
