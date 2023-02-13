import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ChatGateway } from './gateway/chat.gateway';
import { RoomEntity } from './model/room.entity';
import { RoomService } from './services/room-service/room.service';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([RoomEntity])],
  providers: [ChatGateway, RoomService],

})
export class ChatModule {}
