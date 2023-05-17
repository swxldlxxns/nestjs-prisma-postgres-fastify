import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from '../decorators/roles.decorator';
import { RolesEnum } from '../enums/roles.emun';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { UserService } from '../services/user.service';

@Controller()
export class AppController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUsers() {
    return this._userService.findAll();
  }
}
