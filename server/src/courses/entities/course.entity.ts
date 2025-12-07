import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column('simple-json', { nullable: true })
    modules: string[];

    @ManyToOne(() => Student, (student) => student.courses)
    student: Student;
}
