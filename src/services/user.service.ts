import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserInterface } from '../interfaces/user.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}

  async findMany(): Promise<UserInterface[]> {
    return this._prismaService.user.findMany({
      select: {
        id: true,
        name: true,
        user: true,
        pass: false,
        createdAt: true,
        updatedAt: true,
        status: true,
      },
    });
  }

  async findUniqueByUser(user: string): Promise<User> {
    return this._prismaService.user.findUnique({ where: { user } });
  }
}
