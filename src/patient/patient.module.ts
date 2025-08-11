import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';

@Module({
  imports: [PrismaModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
