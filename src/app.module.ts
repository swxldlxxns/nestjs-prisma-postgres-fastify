import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { LoggerMiddleware } from './logger.middleware';
import { PrismaService } from './services/prisma.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [Logger, PrismaService, RoleService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
