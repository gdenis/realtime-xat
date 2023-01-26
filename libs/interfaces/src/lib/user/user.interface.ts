export interface IUser {
  id?: number,
  username?: string,
  email: string,
  password?: string,
  emailToLowerCase?(): void;
}

export interface ICreateUserDTO extends ILoginUserDto{
  username: string;
}

export interface ILoginUserDto {
  email: string;
  password: string;
}

export interface ILoginResponse{
  access_token: string;
  token_type: string;
  expires_in: string;
}
