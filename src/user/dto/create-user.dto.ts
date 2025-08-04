import { CreateUserInput } from '../validators/create-user.zod';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements CreateUserInput {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '@1a2B3c4D',
  })
  password: string;

  @ApiProperty({
    description: 'Papel do usuário',
    enum: ['ADMIN', 'DOCTOR'],
    example: 'DOCTOR',
  })
  role: 'ADMIN' | 'DOCTOR';
}
