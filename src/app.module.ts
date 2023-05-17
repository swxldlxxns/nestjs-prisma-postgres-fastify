import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import config from './config';
import { AppController } from './controllers/app.controller';
import { LoggerMiddleware } from './logger.middleware';
import { AuthService } from './services/auth.service';
import { PrismaService } from './services/prisma.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    AuthService,
    JwtStrategy,
    Logger,
    PrismaService,
    RefreshTokenStrategy,
    RoleService,
    UserService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
