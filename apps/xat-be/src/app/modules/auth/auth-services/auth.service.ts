import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { IUser } from '@realtime-xat/interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  generateJwt(user: IUser): Observable<string>{
    const payload = {...user};
    return from(this.jwtService.signAsync(payload))
  }

  hashPassword(password: string): Observable<string> {
    return from(bcrypt.hash(password, 12));
  }

  validatePassword(
    password: string,
    storedPasswordHash: string
  ): Observable<any> {
    return from(bcrypt.compare(password, storedPasswordHash));
  }
}
