import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { createUserSchema } from './validators/create-user.zod';
import { UserService } from './user.service';
import { UserResponseDto } from './dto/user-response.dto';
import { updateUserSchema } from './validators/update-user.zod';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: UserResponseDto,
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

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'uuid',
  })
  @ApiOkResponse({
    description: 'Usuário encontrado',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
      },
    },
  })
  async findById(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          throw new BadRequestException({
            statusCode: 400,
            message: 'ID inválido',
          });
        },
      }),
    )
    id: string,
  ): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'uuid',
  })
  @ApiOkResponse({
    description: 'Usuário atualizado',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
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
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          throw new BadRequestException({
            statusCode: 400,
            message: 'ID inválido',
          });
        },
      }),
    )
    id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, body);
  }

  @Patch(':id/activate')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'uuid',
  })
  @ApiOkResponse({
    description: 'Usuário ativado',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Usuário já está ativo',
    schema: {
      example: {
        statusCode: 409,
        message: 'Usuário já está ativo',
      },
    },
  })
  async activate(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          throw new BadRequestException({
            statusCode: 400,
            message: 'ID inválido',
          });
        },
      }),
    )
    id: string,
  ): Promise<UserResponseDto> {
    return this.userService.activate(id);
  }

  @Patch(':id/deactivate')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'uuid',
  })
  @ApiOkResponse({
    description: 'Usuário desativado',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Usuário já está desativado',
    schema: {
      example: {
        statusCode: 409,
        message: 'Usuário já está desativado',
      },
    },
  })
  async deactivate(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          throw new BadRequestException({
            statusCode: 400,
            message: 'ID inválido',
          });
        },
      }),
    )
    id: string,
  ): Promise<UserResponseDto> {
    return this.userService.deactivate(id);
  }

  @Patch(':id/soft-delete')
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: 'uuid',
  })
  @ApiOkResponse({
    description: 'Usuário deletado',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'ID inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Usuário não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Usuário não encontrado',
      },
    },
  })
  async softDelete(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () => {
          throw new BadRequestException({
            statusCode: 400,
            message: 'ID inválido',
          });
        },
      }),
    )
    id: string,
  ): Promise<UserResponseDto> {
    return this.userService.softDelete(id);
  }
}
