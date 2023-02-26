import {IsEmail, IsString, Length} from 'class-validator';

export default class LoginUserDto {
  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string ;

  @IsString({message: 'password is required'})
  @Length(6, 16, {message: 'Min length for password is 6, max is 16'})
  public password!: string;
}
