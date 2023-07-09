import { IsIn, IsOptional, IsString } from 'class-validator';
import { Role } from '../../role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  picture: string;

  @IsString()
  @IsIn([Role.ADMIN, Role.USER])
  @IsOptional()
  roles?: Role[];
}
