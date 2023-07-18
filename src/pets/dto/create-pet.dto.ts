import { IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  name: string;

  @IsString()
  kind: string;

  @IsString()
  breed: string;

  @IsString()
  city: string;

  @IsString({ each: true })
  image_url: string[];
}
