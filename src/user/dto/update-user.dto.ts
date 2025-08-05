import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'Nome do usuário' })
  name?: string;

  @ApiPropertyOptional({ example: 'john.doe@example.com', description: 'Email do usuário' })
  email?: string;

  @ApiPropertyOptional({ example: '@1a2B3c4D', description: 'Senha nova do usuário' })
  password?: string;

  @ApiPropertyOptional({
    example: 'DOCTOR',
    enum: ['ADMIN', 'DOCTOR'],
    description: 'Papel do usuário',
  })
  role?: 'ADMIN' | 'DOCTOR';
}
