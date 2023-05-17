import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserInterface } from '../interfaces/user.interface';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}

  async findMany(): Promise<UserInterface[]> {
    return this._prismaService.user.findMany({
      where: {
        status: true,
      },
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

  async findByUser(user: string): Promise<User> {
    return this._prismaService.user.findFirst({
      where: { user, status: true },
    });
  }
}
