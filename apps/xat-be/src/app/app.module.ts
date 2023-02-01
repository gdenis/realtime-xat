import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/middleware/auth.middleware';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ChatModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/api/user',
          method: RequestMethod.POST,
        },
        {
          path: '/api/user/login',
          method: RequestMethod.POST,
        }
      )
      .forRoutes('');
  }
}
