import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './validators/create-user.zod';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        id: 'uuid',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'DOCTOR',
        createdAt: '2025-08-03T19:00:00.000Z',
        updatedAt: '2025-08-03T19:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Dados inválidos',
    schema: {
      example: {
        statusCode: 400,
        message: 'Dados inválidos',
        errors: [{ field: 'email', message: 'Invalid email' }],
      },
    },
  })
  @ApiConflictResponse({
    description: 'E-mail já cadastrado',
    schema: {
      example: {
        statusCode: 409,
        message: 'E-mail já cadastrado',
      },
    },
  })
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Get()
  @ApiOkResponse({
    description: 'Lista de usuários cadastrados',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }
}
