import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { PatientService } from './patient.service.js';
import { PatientController } from './patient.controller.js';

@Module({
  imports: [PrismaModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
