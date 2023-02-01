import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ILoginResponse, IUser } from '@realtime-xat/interfaces';
import { environment } from '../../../../environments/environment';
import { Pagination } from 'nestjs-typeorm-paginate';
import { map, Observable, switchMap } from 'rxjs';
import { CreateUserDto, LoginUserDto } from '../models/dto/user.dto';
import { UserHelperService } from '../service/user-helper/user-helper.service';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../../auth/guards/public-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userHelperService: UserHelperService
  ) {}

  @Post('create-user')
  create(@Body() createUserDto: CreateUserDto): Observable<IUser> {
    return this.userHelperService
      .createUserDtoToEntity(createUserDto)
      .pipe(switchMap((user: IUser) => this.userService.create(user)));
  }

  //@UseGuards(JwtAuthGuard)
  //Needed for Swagger Documentation
  @ApiBearerAuth('access-token')
  @Get('find-all')
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ): Observable<Pagination<IUser>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll({
      page,
      limit,
      route: `${environment.API_PAGINATION_ROUTE}user`,
    });
  }

  @Post('login')
  //  @Public()
  login(@Body() loginUserDto: LoginUserDto): Observable<ILoginResponse> {
    return this.userHelperService.loginUserDtoToEntity(loginUserDto).pipe(
      switchMap((user: IUser) =>
        this.userService.login(user).pipe(
          map((jwt: string) => {
            const loginResponse: ILoginResponse = {
              access_token: jwt,
              token_type: 'JWT',
              expires_in: '10h',
            };
            return loginResponse;
          })
        )
      )
    );
  }
}
