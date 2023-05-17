import { Injectable } from '@nestjs/common';
import { Rol } from '@prisma/client';

import { PrismaService } from './prisma.service';

@Injectable()
export class RoleService {
  constructor(private _prismaService: PrismaService) {}

  async findManyByUserId(userId: number): Promise<Rol[]> {
    return this._prismaService.rol.findMany({
      where: {
        userId,
        status: true,
      },
    });
  }
}
