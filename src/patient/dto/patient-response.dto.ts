import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PatientResponseDto {
  @ApiProperty({ example: 'uuid', description: 'ID do paciente' })
  id: string;

  @ApiProperty({ example: 'uuid', description: 'ID do doutor (User)' })
  doctorId: string;

  @ApiProperty({ example: 'jane.doe@example.com', description: 'Email do paciente' })
  email: string;

  @ApiPropertyOptional({ example: '+55 11 91234-5678', description: 'Telefone do paciente' })
  phone: string | null;

  @ApiProperty({ example: 'Jane Doe', description: 'Nome do paciente' })
  name: string;

  @ApiPropertyOptional({ example: '1990-05-20', description: 'Aniversário' })
  birthday: Date | null;

  @ApiPropertyOptional({ example: 'São Paulo', description: 'Cidade' })
  city: string | null;

  @ApiProperty({ example: true, description: 'Se o paciente está ativo' })
  isActive: boolean;

  @ApiProperty({ example: false, description: 'Se o paciente está deletado' })
  isDeleted: boolean;

  @ApiPropertyOptional({ example: '2025-08-03T19:00:00.000Z', description: 'Data de exclusão' })
  deletedAt: Date | null;

  @ApiProperty({ example: '2025-08-03T19:00:00.000Z', description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-03T19:00:00.000Z', description: 'Data de atualização' })
  updatedAt: Date;
}
