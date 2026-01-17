import { IsString, IsUUID } from 'class-validator';

export class UpdateActorDto {
  @IsString()
  name: string;
}
