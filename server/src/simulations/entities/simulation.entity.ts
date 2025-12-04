import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Simulation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    score: number;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Student, (student) => student.simulations)
    student: Student;
}
