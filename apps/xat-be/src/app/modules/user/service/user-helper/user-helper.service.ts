import { CreateUserDto, LoginUserDto } from '../../models/dto/user.dto';
import { Observable, of } from 'rxjs';

import { IUser } from '@realtime-xat/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserHelperService {
  createUserDtoToEntity(createUserDto: CreateUserDto): Observable<IUser> {
    return of<IUser>({
      email: createUserDto.email,
      username: createUserDto.username,
      password: createUserDto.password,
    });
  }

  loginUserDtoToEntity(loginUserDto: LoginUserDto): Observable<IUser> {
    return of<IUser>({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
  }
}
