import { z } from 'zod';

export const createUserSchema = z.object({
  name: z
    .string({ message: 'Nome inválido' })
    .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
    .max(100, { message: 'Nome deve ter no máximo 100 caracteres' })
    .trim(),
  email: z
    .email({ message: 'Email inválido' })
    .max(100, { message: 'Email deve ter no máximo 100 caracteres' })
    .transform((email) => email.trim().toLowerCase()),
  password: z
    .string({ message: 'Senha inválida' })
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .max(32, { message: 'Senha deve ter no máximo 32 caracteres' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'A senha deve conter letra maiúscula, minúscula, número e caractere especial',
    ),
  role: z.enum(['ADMIN', 'DOCTOR'], {
    message: 'Role inválida',
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
