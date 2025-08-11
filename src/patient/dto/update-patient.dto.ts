import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePatientDto {
  @ApiPropertyOptional({ example: 'Jane Doe', description: 'Nome do paciente' })
  name?: string;

  @ApiPropertyOptional({ example: 'jane.doe@example.com', description: 'Email do paciente' })
  email?: string;

  @ApiPropertyOptional({ example: '+55 11 91234-5678', description: 'Telefone do paciente' })
  phone?: string;

  @ApiPropertyOptional({ example: '1990-05-20', description: 'Aniversário (YYYY-MM-DD)' })
  birthday?: string;

  @ApiPropertyOptional({ example: 'São Paulo', description: 'Cidade' })
  city?: string;
}
