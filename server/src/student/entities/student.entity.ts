import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Simulation } from '../../simulations/entities/simulation.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  university: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Course, (course) => course.student)
  courses: Course[];

  @OneToMany(() => Simulation, (simulation) => simulation.student)
  simulations: Simulation[];
}
