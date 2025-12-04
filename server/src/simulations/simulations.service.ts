import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Simulation } from './entities/simulation.entity';

@Injectable()
export class SimulationsService {
    constructor(
        @InjectRepository(Simulation)
        private simulationRepository: Repository<Simulation>,
    ) { }

    create(createSimulationDto: any) {
        return this.simulationRepository.save(createSimulationDto);
    }

    findAll() {
        return this.simulationRepository.find();
    }

    findOne(id: number) {
        return this.simulationRepository.findOne({ where: { id } });
    }
}
