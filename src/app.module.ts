import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ActorsModule } from './actors/actors.module';
import { PrismaModule } from './prisma.module';
import { LoggingMiddleware } from './middlewares/logging.middelware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ActorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggingMiddleware).forRoutes('actors');
    consumer.apply(LoggingMiddleware).forRoutes('*'); //for all routes
  }
}
