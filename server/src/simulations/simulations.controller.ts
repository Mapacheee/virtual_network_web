import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SimulationsService } from './simulations.service';

@Controller('simulations')
export class SimulationsController {
    constructor(private readonly simulationsService: SimulationsService) { }

    @Post()
    create(@Body() createSimulationDto: any) {
        return this.simulationsService.create(createSimulationDto);
    }

    @Get()
    findAll() {
        return this.simulationsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.simulationsService.findOne(+id);
    }
}
