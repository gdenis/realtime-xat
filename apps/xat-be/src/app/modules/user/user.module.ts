import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { UserEntity } from './models/entity/user.entity';
import { UserService } from './service/user.service';
import { UserHelperService } from './service/user-helper/user-helper.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [UserController],
  providers: [UserService, UserHelperService],
  exports: [UserService]
})
export class UserModule {}
