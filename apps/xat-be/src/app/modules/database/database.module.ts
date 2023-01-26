import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/models/entity/user.entity';
import { environment } from '../../../../src/environments/environment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: environment.POSTGRESS_LOCAL_PORT,
      username: environment.POSTGRES_USER,
      password: environment.POSTGRES_PASSWORD,
      database: environment.POSTGRES_DB,
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
