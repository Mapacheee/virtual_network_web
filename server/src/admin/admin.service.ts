import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
    ) { }

    findByUsername(username: string) {
        return this.adminRepository.findOne({ where: { username } });
    }

    create(admin: Partial<Admin>) {
        return this.adminRepository.save(admin);
    }
}
