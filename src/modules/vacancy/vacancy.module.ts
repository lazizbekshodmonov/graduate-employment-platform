import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { VacancyRepository } from './vacancy.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacancyEntity } from './vacancy.entity';
import { EmployerRepository } from '../employer/employer.repository';
import { VacancyMapper } from './vacancy.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([VacancyEntity])],
  controllers: [VacancyController],
  providers: [
    VacancyService,
    VacancyRepository,
    EmployerRepository,
    VacancyMapper,
  ],
})
export class VacancyModule {}
