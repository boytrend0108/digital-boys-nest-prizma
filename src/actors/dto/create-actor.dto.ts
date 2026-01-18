import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({
    description: 'Name of the actor',
    example: 'Robert Downey Jr',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'List of movie IDs the actor has appeared in',
    example: ['movieId1', 'movieId2'],
    type: 'array',
    items: { type: 'string' },
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  movies?: string[];
}
