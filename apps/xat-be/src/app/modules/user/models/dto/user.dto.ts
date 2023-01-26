import { ICreateUserDTO, ILoginUserDto } from "@realtime-xat/interfaces";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto implements ILoginUserDto{

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

}

export class CreateUserDto extends LoginUserDto implements ICreateUserDTO {

  @IsString()
  @IsNotEmpty()
  username: string;

}
