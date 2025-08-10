import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 'uuid', description: 'ID do usuário' })
  id: string;

  @ApiProperty({ example: 'John Doe', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: 'DOCTOR', enum: ['ADMIN', 'DOCTOR'], description: 'Papel do usuário' })
  role: 'ADMIN' | 'DOCTOR';

  @ApiProperty({ example: true, description: 'Se o usuário está ativo' })
  isActive: boolean;

  @ApiProperty({ example: true, description: 'Se o usuário está deletado' })
  isDeleted: boolean;

  @ApiProperty({ example: '2025-08-03T19:00:00.000Z', description: 'Data de criação' })
  createdAt: Date;

  @ApiProperty({
    example: '2025-08-03T19:00:00.000Z',
    description: 'Data de atualização',
  })
  updatedAt: Date;

  @ApiProperty({
    example: '2025-08-03T19:00:00.000Z',
    description: 'Data de exclusão',
  })
  deletedAt: Date | null;
}
