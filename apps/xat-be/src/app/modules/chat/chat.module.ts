import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [UserModule, AuthModule],
  providers: [ChatGateway],
})
export class ChatModule {}
