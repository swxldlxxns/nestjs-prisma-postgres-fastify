import { Controller, Get } from '@nestjs/common';

import { UserService } from '../services/user.service';

@Controller()
export class AppController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  getUsers() {
    return this._userService.findAll();
  }
}
