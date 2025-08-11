import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiConflictResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
  ApiGoneResponse,
} from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { PatientService } from './patient.service';
import { createPatientSchema } from './validators/create-patient.zod';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientResponseDto } from './dto/patient-response.dto';
import { updatePatientSchema } from './validators/update-patient.zod';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('patients')
@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Paciente criado com sucesso', type: PatientResponseDto })
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
  @ApiUnprocessableEntityResponse({
    description: 'Dados inválidos',
    schema: {
      example: {
        statusCode: 422,
        message: 'Dados inválidos',
        errors: [{ field: 'email', message: 'E-mail inválido' }],
      },
    },
  })
  @UsePipes(new ZodValidationPipe(createPatientSchema))
  async create(@Body() body: CreatePatientDto): Promise<PatientResponseDto> {
    return this.patientService.create(body);
  }

  @Get()
  @ApiQuery({ name: 'doctorId', required: true, example: 'uuid' })
  @ApiOkResponse({ description: 'Lista de pacientes do doutor', type: [PatientResponseDto] })
  @ApiBadRequestResponse({
    description: 'ID do doutor inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID do doutor inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Doutor não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Doutor não encontrado',
      },
    },
  })
  async findAllByDoctor(
    @Query(
      'doctorId',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException({ statusCode: 400, message: 'ID do doutor inválido' }),
      }),
    )
    doctorId: string,
  ): Promise<PatientResponseDto[]> {
    return this.patientService.findAllByDoctor(doctorId);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'ID do paciente', example: 'uuid' })
  @ApiOkResponse({ description: 'Paciente encontrado', type: PatientResponseDto })
  @ApiBadRequestResponse({
    description: 'ID do paciente inválido',
    schema: {
      example: {
        statusCode: 400,
        message: 'ID do paciente inválido',
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Paciente não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Paciente não encontrado',
      },
    },
  })
  async findById(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException({ statusCode: 400, message: 'ID inválido' }),
      }),
    )
    id: string,
  ): Promise<PatientResponseDto> {
    return this.patientService.findById(id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'ID do paciente', example: 'uuid' })
  @ApiOkResponse({ description: 'Paciente atualizado', type: PatientResponseDto })
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
    description: 'Paciente não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Paciente não encontrado',
      },
    },
  })
  @ApiUnprocessableEntityResponse({
    description: 'Dados inválidos',
    schema: {
      example: {
        statusCode: 422,
        message: 'Dados inválidos',
        errors: [{ field: 'email', message: 'E-mail inválido' }],
      },
    },
  })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException({ statusCode: 400, message: 'ID inválido' }),
      }),
    )
    id: string,
    @Body(new ZodValidationPipe(updatePatientSchema)) body: UpdatePatientDto,
  ): Promise<PatientResponseDto> {
    return this.patientService.update(id, body);
  }

  @Patch(':id/activate')
  @ApiParam({ name: 'id', description: 'ID do paciente', example: 'uuid' })
  @ApiOkResponse({ description: 'Paciente ativado', type: PatientResponseDto })
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
    description: 'Paciente não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Paciente não encontrado',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Paciente já está ativo',
    schema: {
      example: {
        statusCode: 409,
        message: 'Paciente já está ativo',
      },
    },
  })
  async activate(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException({ statusCode: 400, message: 'ID inválido' }),
      }),
    )
    id: string,
  ): Promise<PatientResponseDto> {
    return this.patientService.activate(id);
  }

  @Patch(':id/deactivate')
  @ApiParam({ name: 'id', description: 'ID do paciente', example: 'uuid' })
  @ApiOkResponse({ description: 'Paciente desativado', type: PatientResponseDto })
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
    description: 'Paciente não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Paciente não encontrado',
      },
    },
  })
  @ApiConflictResponse({
    description: 'Paciente já está desativado',
    schema: {
      example: {
        statusCode: 409,
        message: 'Paciente já está desativado',
      },
    },
  })
  async deactivate(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException({ statusCode: 400, message: 'ID inválido' }),
      }),
    )
    id: string,
  ): Promise<PatientResponseDto> {
    return this.patientService.deactivate(id);
  }

  @Patch(':id/soft-delete')
  @ApiParam({ name: 'id', description: 'ID do paciente', example: 'uuid' })
  @ApiOkResponse({ description: 'Paciente removido', type: PatientResponseDto })
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
    description: 'Paciente não encontrado',
    schema: {
      example: {
        statusCode: 404,
        message: 'Paciente não encontrado',
      },
    },
  })
  @ApiGoneResponse({
    description: 'Paciente já está deletado',
    schema: {
      example: {
        statusCode: 410,
        message: 'Paciente já está deletado',
      },
    },
  })
  async softDelete(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException({ statusCode: 400, message: 'ID inválido' }),
      }),
    )
    id: string,
  ): Promise<PatientResponseDto> {
    return this.patientService.softDelete(id);
  }
}
