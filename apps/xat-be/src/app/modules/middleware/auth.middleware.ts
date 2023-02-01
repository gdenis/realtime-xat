import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { IUser } from '@realtime-xat/interfaces';
import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../auth/auth-services/auth.service';
import { UserService } from '../user/service/user.service';

export interface RequestModel extends Request {
  user: IUser;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenArray: string[] = req.headers['authorization'].split(' ');

      // Make sure user is not deleted or that props pr right chamged compared to the time the jwt was issued.
      const decodedToken: IUser = await this.authService.verifyJwt(
        tokenArray[1]
      );
      const user: IUser = await this.userService.getOne(decodedToken.id);

      //Add user to request object so we can acces it later.
      if (user) {
        req.user = user;
        next();
      } else {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
