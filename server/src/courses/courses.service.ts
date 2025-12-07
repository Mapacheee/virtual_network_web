import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private courseRepository: Repository<Course>,
    ) { }

    create(createCourseDto: any) {
        return this.courseRepository.save(createCourseDto);
    }

    findAll() {
        return this.courseRepository.find();
    }

    findOne(id: number) {
        return this.courseRepository.findOne({ where: { id } });
    }

    update(id: number, updateCourseDto: any) {
        return this.courseRepository.update(id, updateCourseDto);
    }

    remove(id: number) {
        return this.courseRepository.delete(id);
    }
}
