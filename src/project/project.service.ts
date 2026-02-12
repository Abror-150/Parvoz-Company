import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: string) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(id: string, dto: UpdateProjectDto) {
    try {
      const updatedProject = await this.prisma.project.update({
        where: { id },
        data: dto,
      });
      return updatedProject;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.project.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }
}
