import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) { }

  create(createQuizDto: any) {
    return this.quizRepository.save(createQuizDto);
  }

  findAll() {
    return this.quizRepository.find();
  }

  findOne(id: number) {
    return this.quizRepository.findOne({ where: { id } });
  }

  update(id: number, updateQuizDto: any) {
    return this.quizRepository.update(id, updateQuizDto);
  }

  remove(id: number) {
    return this.quizRepository.delete(id);
  }
}
