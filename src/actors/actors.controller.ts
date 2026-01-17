import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Post()
  async create(@Body() dto: CreateActorDto) {
    return this.actorsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.actorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.actorsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    return this.actorsService.update(id, dto);
  }
}
