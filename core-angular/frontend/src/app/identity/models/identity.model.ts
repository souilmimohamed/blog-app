export interface RegisterUserDto {
  Email: string;
  Name: string;
  Username: string;
  Password: string;
}

export interface UserDto {
  Name: string;
  Username: string;
  Email: string;
  ProfileImageUrl: string;
}

export interface LoginResponseDto extends UserDto {
  Token: string;
}

export interface LoginDto {
  Email: string;
  Password: string;
}
