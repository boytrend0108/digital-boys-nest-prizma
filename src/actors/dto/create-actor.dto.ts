import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActorDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  movies?: string[];
}
