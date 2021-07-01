import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import AuthModule from './auth/auth.module';
import { BodyParserMiddleware } from './infrastructure/middlewares/body-parser.middleware';
import CacheModule from './cache/cache.module';
import ConfigModule from './config/config.module';
import HealthCheckModule from './healthcheck/healthcheck.module';
import LoggingModule from './logging/logging.module';
import DatabaseModule from './database/database.module';
import EnvironmentModule from './environment/environment.module';
import { TraceIDMiddleware } from './infrastructure/middlewares/trace-id-middleware';
import { AuthMiddleware } from './infrastructure/middlewares/auth.middleware';
import { ParkingModule } from './parking/parking.module';

@Module({
  imports: [
    HealthCheckModule,
    CacheModule,
    LoggingModule,
    ConfigModule,
    AuthModule,
    DatabaseModule,
    EnvironmentModule,
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware, TraceIDMiddleware, BodyParserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
