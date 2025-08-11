import { z } from 'zod';

export const createPatientSchema = z.object({
  doctorId: z.uuid({ message: 'ID do doutor inválido', version: 'v4' }),
  name: z
    .string({ message: 'Nome inválido' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' }),
  email: z
    .email({ message: 'Email inválido' })
    .max(100, { message: 'Email deve ter no máximo 100 caracteres' }),
  phone: z
    .string({ message: 'Telefone inválido' })
    .trim()
    .min(8, { message: 'Telefone inválido' })
    .max(30, { message: 'Telefone deve ter no máximo 30 caracteres' })
    .optional(),
  birthday: z
    .string({ message: 'Data inválida' })
    .regex(/^\d{4}-\d{2}-\d{2}$/u, { message: 'Data deve estar no formato YYYY-MM-DD' })
    .optional(),
  city: z
    .string({ message: 'Cidade inválida' })
    .min(2, { message: 'Cidade inválida' })
    .max(100, { message: 'Cidade deve ter no máximo 100 caracteres' })
    .optional(),
});

export type CreatePatientInput = z.infer<typeof createPatientSchema>;
