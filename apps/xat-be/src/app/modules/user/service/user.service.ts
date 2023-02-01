import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from '@realtime-xat/interfaces';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { FindOneOptions, Repository } from 'typeorm';
import { UserEntity } from '../models/entity/user.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { AuthService } from '../../auth/auth-services/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService
  ) {}

  create(newUser: IUser): Observable<IUser> {
    return this.mailExists(newUser.email).pipe(
      switchMap((exists: boolean) => {
        if (!exists) {
          return this.authService.hashPassword(newUser.password).pipe(
            switchMap((passwordHash: string) => {
              //Override user password with hashed password
              newUser.password = passwordHash;
              return from(this.userRepository.save(newUser)).pipe(
                switchMap((user: IUser) => this.findOne(user.id))
              );
            })
          );
        } else {
          throw new HttpException(
            'Email is already in use',
            HttpStatus.CONFLICT
          );
        }
      })
    );
  }

  private findOne(id: number): Observable<IUser> {
    return from(this.userRepository.findOneBy({ id: id }));
  }

  private mailExists(email: string): Observable<boolean> {
    return this.findByEmail(email).pipe(
      map((user: IUser) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  findAll(options: IPaginationOptions): Observable<Pagination<IUser>> {
    return from(paginate<UserEntity>(this.userRepository, options));
  }

  private findByEmail(email: string): Observable<IUser> {
    const options: FindOneOptions<IUser> = {
      where: { email: email },
      select: ['id', 'email', 'username', 'password'],
    };

    return from(this.userRepository.findOne(options));
  }

  public getOne(id: number): Promise<IUser> {
    return this.userRepository.findOneByOrFail({ id: id });
  }

  login(user: IUser): Observable<string> {
    return this.findByEmail(user.email).pipe(
      switchMap((foundUser: IUser) => {
        if (foundUser) {
          return this.authService
            .validatePassword(user.password, foundUser.password)
            .pipe(
              switchMap((matches: boolean) => {
                if (matches) {
                  return this.findOne(foundUser.id).pipe(
                    switchMap((payload: IUser) =>
                      this.authService.generateJwt(payload)
                    )
                  );
                } else {
                  throw new HttpException(
                    'Login was not successfull, wrong credentials',
                    HttpStatus.UNAUTHORIZED
                  );
                }
              })
            );
        } else {
          throw new HttpException('User not fund', HttpStatus.NOT_FOUND);
        }
      })
    );
  }
}
