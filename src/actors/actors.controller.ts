import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { StringToLowercasePipe } from 'src/common/pipes/string-to-lowercase.pipe';
import { UserAgent } from 'src/common/decorators/user-agent.decorator';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @ApiOperation({
    summary: 'Create a new actor',
    description: 'Creates a new actor with the provided details',
  })
  @ApiResponse({
    status: 201,
    description: 'Actor created successfully',
    type: CreateActorDto,
  })
  @HttpCode(201)
  @Post()
  async create(@Body(StringToLowercasePipe) dto: CreateActorDto) {
    return this.actorsService.create(dto);
  }

  @ApiOperation({
    summary: 'Get all actors',
    description: 'Returns a list of all actors',
  })
  @ApiResponse({
    status: 200,
    description: 'List of actors retrieved successfully',
    type: [CreateActorDto],
  })
  @Get()
  async findAll(@UserAgent() userAgent: string) {
    console.log('User-Agent:', userAgent);
    return this.actorsService.findAll();
  }

  @ApiOperation({
    summary: 'Get actor by ID',
    description: 'Returns a single actor by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Actor retrieved successfully',
    type: CreateActorDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Actor not found',
  })
  @ApiHeader({ name: 'User-Agent', required: false })
  @ApiQuery({ name: 'includeMovies', required: false, type: Boolean })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.actorsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    return this.actorsService.update(id, dto);
  }
}
