import { BadRequestException, Injectable, NotFoundException, GoneException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientInput } from './validators/create-patient.zod';
import { UpdatePatientInput } from './validators/update-patient.zod';
import { PatientResponseDto } from './dto/patient-response.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  private patientSelect() {
    return {
      id: true,
      doctorId: true,
      email: true,
      phone: true,
      name: true,
      birthday: true,
      city: true,
      isActive: true,
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    } as const;
  }

  private async checkPatientExists(id: string): Promise<PatientResponseDto> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      select: this.patientSelect(),
    });
    if (!patient) {
      throw new NotFoundException({ message: 'Paciente não encontrado' });
    }
    return patient;
  }

  async create(data: CreatePatientInput): Promise<PatientResponseDto> {
    const patient = await this.prisma.patient.create({
      data: {
        doctor: { connect: { id: data.doctorId } },
        email: data.email,
        phone: data.phone ?? null,
        name: data.name,
        birthday: data.birthday ? new Date(data.birthday) : null,
        city: data.city ?? null,
      },
      select: this.patientSelect(),
    });
    return patient;
  }

  async findAllByDoctor(doctorId: string): Promise<PatientResponseDto[]> {
    return this.prisma.patient.findMany({
      where: { doctor: { id: doctorId } },
      select: this.patientSelect(),
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<PatientResponseDto> {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      select: this.patientSelect(),
    });
    if (!patient) {
      throw new NotFoundException({ message: 'Paciente não encontrado' });
    }
    return patient;
  }

  async update(id: string, data: UpdatePatientInput): Promise<PatientResponseDto> {
    await this.checkPatientExists(id);
    const patient = await this.prisma.patient.update({
      where: { id },
      data: {
        email: data.email,
        phone: data.phone,
        name: data.name,
        birthday: data.birthday ? new Date(data.birthday) : undefined,
        city: data.city,
      },
      select: this.patientSelect(),
    });
    return patient;
  }

  async activate(id: string): Promise<PatientResponseDto> {
    const patient = await this.checkPatientExists(id);

    if (patient.isActive) {
      throw new BadRequestException({ message: 'Paciente já está ativo' });
    }

    return this.prisma.patient.update({
      where: { id },
      data: { isActive: true },
      select: this.patientSelect(),
    });
  }

  async deactivate(id: string): Promise<PatientResponseDto> {
    const patient = await this.checkPatientExists(id);

    if (!patient.isActive) {
      throw new BadRequestException({ message: 'Paciente já está inativo' });
    }

    return this.prisma.patient.update({
      where: { id },
      data: { isActive: false },
      select: this.patientSelect(),
    });
  }

  async softDelete(id: string): Promise<PatientResponseDto> {
    const patient = await this.checkPatientExists(id);

    if (patient.isDeleted) {
      throw new GoneException({ message: 'Paciente já está deletado' });
    }

    return this.prisma.patient.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
      select: this.patientSelect(),
    });
  }
}
