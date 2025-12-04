import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Simulation } from './entities/simulation.entity';
import { SimulationsService } from './simulations.service';
import { SimulationsController } from './simulations.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Simulation])],
    controllers: [SimulationsController],
    providers: [SimulationsService],
})
export class SimulationsModule { }
