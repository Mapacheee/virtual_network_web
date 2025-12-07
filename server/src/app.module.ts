import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StudentModule } from './student/student.module';
import { CoursesModule } from './courses/courses.module';
import { SimulationsModule } from './simulations/simulations.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { QuizModule } from './quiz/quiz.module';
import { Student } from './student/entities/student.entity';
import { Course } from './courses/entities/course.entity';
import { Simulation } from './simulations/entities/simulation.entity';
import { Admin } from './admin/entities/admin.entity';
import { Quiz } from './quiz/entities/quiz.entity';
import { AdminService } from './admin/admin.service';
import { CoursesService } from './courses/courses.service';
import { QuizService } from './quiz/quiz.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Student, Course, Simulation, Admin, Quiz],
      synchronize: true,
    }),
    StudentModule,
    CoursesModule,
    SimulationsModule,
    AuthModule,
    AdminModule,
    QuizModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly adminService: AdminService,
    private readonly coursesService: CoursesService,
    private readonly quizService: QuizService
  ) { }

  async onModuleInit() {
    const admin = await this.adminService.findByUsername('admin');
    if (!admin) {
      await this.adminService.create({ username: 'admin', password: 'adminpassword' });
    }

    const courses = await this.coursesService.findAll();
    if (courses.length === 0) {
      await this.coursesService.create({
        title: 'Introducción a la Entrevista',
        description: 'Aprende los fundamentos para enfrentar tu primera entrevista laboral.',
        modules: ['Preparación Previa', 'Lenguaje Corporal', 'Preguntas Comunes', 'Cierre Exitoso']
      });
      await this.coursesService.create({
        title: 'Gestión de Conflictos',
        description: 'Técnicas para resolver disputas en el ambiente de trabajo.',
        modules: ['Identificación del Conflicto', 'Escucha Activa', 'Negociación', 'Acuerdos Win-Win']
      });
      await this.coursesService.create({
        title: 'Liderazgo Efectivo',
        description: 'Desarrolla habilidades para liderar equipos pequeños.',
        modules: ['Estilos de Liderazgo', 'Delegación Eficiente', 'Motivación de Equipos', 'Feedback Constructivo']
      });
    }

    const quizzes = await this.quizService.findAll();
    if (quizzes.length === 0) {
      await this.quizService.create({
        title: 'Entrevista Laboral',
        description: 'Simula una entrevista de trabajo real.',
        questions: [
          { q: "¿Cuál es el objetivo principal de una entrevista?", options: ["Conseguir el trabajo", "Hacer amigos", "Pasar el tiempo"], correct: 0 },
          { q: "¿Qué debes hacer antes de una reunión importante?", options: ["Dormir", "Preparar los temas", "Comer mucho"], correct: 1 },
          { q: "¿Cómo manejar un conflicto laboral?", options: ["Gritar", "Ignorar", "Dialogar asertivamente"], correct: 2 }
        ]
      });
      await this.quizService.create({
        title: 'Reunión de Equipo',
        description: 'Practica tu participación en reuniones.',
        questions: [
          { q: "¿Qué debes hacer antes de una reunión importante?", options: ["Dormir", "Preparar los temas", "Comer mucho"], correct: 1 }
        ]
      });
      await this.quizService.create({
        title: 'Resolución de Conflictos',
        description: 'Aprende a resolver conflictos.',
        questions: [
          { q: "¿Cómo manejar un conflicto laboral?", options: ["Gritar", "Ignorar", "Dialogar asertivamente"], correct: 2 }
        ]
      });
    }
  }
}
