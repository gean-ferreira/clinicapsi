import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './validators/create-user.zod';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async checkEmailUnique(email: string, excludeUserId?: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user && user.id !== excludeUserId) {
      throw new ConflictException({ message: 'E-mail já cadastrado' });
    }
  }

  async create(data: CreateUserInput) {
    // 1. Verifica se o e-mail já está cadastrado
    await this.checkEmailUnique(data.email);

    // 2. Hash da senha
    const passwordHash = await bcrypt.hash(data.password, 12);

    // 3. Cria o usuário
    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        role: data.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
