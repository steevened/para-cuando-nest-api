import { IsString, MinLength } from 'class-validator';

export class CreateCityDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  country: string;
}
