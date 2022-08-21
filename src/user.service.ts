import { Injectable } from '@nestjs/common';
// преимущество использования `Prisma` в `TypeScript-проекте` состоит в том,
// что `Prisma` автоматически генерирует типы для моделей и их вариаций
import { User, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  // внедряем зависимость
  constructor(private prisma: PrismaService) {}

  // получение пользователя по email
  async user(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  // получение всех пользователей
  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // создание пользователя
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  // обновление пользователя
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  // удаление пользователя
  async removeUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
