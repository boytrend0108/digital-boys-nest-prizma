import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Injectable()
export class ActorsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateActorDto) {
    const { name, movies = [] } = dto;

    const actor = await this.prismaService.actor.create({
      data: {
        name,
        ...(movies.length > 0 && {
          movies: {
            connect: movies.map((id) => ({ id })),
          },
        }),
      },
    });

    return actor;
  }

  async findAll() {
    return this.prismaService.actor.findMany({
      include: { movies: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const actor = await this.prismaService.actor.findUnique({
      where: { id },
      include: { movies: true },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    return actor;
  }

  async update(id: string, dto: UpdateActorDto) {
    const actor = await this.prismaService.actor.findUnique({
      where: { id },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} not found`);
    }

    const updatedData = Object.assign(actor, dto);

    return this.prismaService.actor.update({
      where: { id },
      data: updatedData,
    });
  }
}
