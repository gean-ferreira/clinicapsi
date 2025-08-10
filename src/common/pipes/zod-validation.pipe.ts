import { Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { ZodError, ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        throw new UnprocessableEntityException({
          statusCode: 422,
          message: 'Dados inválidos',
          errors,
        });
      }
      throw error;
    }
  }
}
