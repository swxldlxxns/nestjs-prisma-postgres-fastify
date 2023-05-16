import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this._prismaService.user.findMany();
  }
}
