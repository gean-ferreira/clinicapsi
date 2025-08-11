import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreatePatientInput } from '../validators/create-patient.zod';

export class CreatePatientDto implements CreatePatientInput {
  @ApiProperty({ example: 'uuid', description: 'ID do doutor (User)' })
  doctorId: string;

  @ApiProperty({ example: 'Jane Doe', description: 'Nome do paciente' })
  name: string;

  @ApiProperty({ example: 'jane.doe@example.com', description: 'Email do paciente' })
  email: string;

  @ApiPropertyOptional({ example: '+55 11 91234-5678', description: 'Telefone do paciente' })
  phone?: string;

  @ApiPropertyOptional({ example: '1990-05-20', description: 'Aniversário (YYYY-MM-DD)' })
  birthday?: string;

  @ApiPropertyOptional({ example: 'São Paulo', description: 'Cidade' })
  city?: string;
}
