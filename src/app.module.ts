import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import config from './config';
import { AppController } from './controllers/app.controller';
import { LoggerMiddleware } from './logger.middleware';
import { PrismaService } from './services/prisma.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: ({
        jwt: { expiresIn, secret },
      }: ConfigType<typeof config>) => ({
        secret,
        signOptions: {
          expiresIn,
        },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [JwtStrategy, Logger, PrismaService, RoleService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
