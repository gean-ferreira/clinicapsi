import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './validators/create-user.zod';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserInput } from './validators/update-user.zod';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  private async checkEmailUnique(email: string, excludeUserId?: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user && user.id !== excludeUserId) {
      throw new ConflictException({ message: 'E-mail já cadastrado' });
    }
  }

  private async checkUserExists(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException({ message: 'Usuário não encontrado' });
    }
  }

  async create(data: CreateUserInput): Promise<UserResponseDto> {
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

  async findAll(): Promise<UserResponseDto[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, data: UpdateUserInput): Promise<UserResponseDto> {
    // 1. Verifica se o usuário existe
    await this.checkUserExists(id);

    // 2. Verifica se o e-mail já está cadastrado e se é diferente do usuário atual
    if (data.email) {
      await this.checkEmailUnique(data.email, id);
    }

    // 3. Hash da senha
    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 12);
      data.password = passwordHash;
    }

    // 4. Atualiza o usuário
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
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

    return updatedUser;
  }
}
