import { Injectable } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Injectable()
export class RoleService {
  constructor(private _prismaService: PrismaService) {}
}
