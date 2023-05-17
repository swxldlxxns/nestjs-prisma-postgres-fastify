import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { RolesEnum } from '../enums/roles.emun';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { RolesGuard } from '../guards/roles.guard';
import {
  LoginResponse,
  LoginResponseInterface,
  RefreshTokenResponse,
  RefreshTokenResponseInterface,
} from '../interfaces/login-response.interface';
import { UserInfo, UserInterface } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@ApiTags('')
@Controller()
export class AppController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Get()
  @Roles(RolesEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiSecurity('bearer')
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiOkResponse({
    type: UserInfo,
    isArray: true,
  })
  async getUsers(): Promise<UserInterface[]> {
    return this._userService.findMany();
  }

  @Post('login')
  @ApiCreatedResponse({
    type: LoginResponse,
  })
  @ApiUnauthorizedResponse()
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseInterface> {
    const login: LoginResponseInterface = await this._authService.login(body);

    if (!login) throw new UnauthorizedException();

    return login;
  }

  @Post('refresh-token')
  @UseGuards(RefreshTokenGuard)
  @ApiSecurity('bearer')
  @ApiCreatedResponse({
    type: RefreshTokenResponse,
  })
  async refreshToken(@Req() req): Promise<RefreshTokenResponseInterface> {
    const refresh: RefreshTokenResponseInterface =
      await this._authService.refreshToken(req.user.user);

    if (!refresh) throw new UnauthorizedException();

    return refresh;
  }
}
