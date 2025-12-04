import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    create(@Body() createStudentDto: any) {
        return this.studentService.create(createStudentDto);
    }

    @Get()
    findAll() {
        return this.studentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStudentDto: any) {
        return this.studentService.update(+id, updateStudentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.studentService.remove(+id);
    }
}
