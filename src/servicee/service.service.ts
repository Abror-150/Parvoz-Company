import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    return this.prisma.service.create({ data: dto });
  }

  async findAll() {
    return this.prisma.service.findMany();
  }

  async update(id: string, dto: UpdateServiceDto) {
    try {
      return await this.prisma.service.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      throw error;
    }
  }

  // src/servicee/service.service.ts

  async remove(id: string) {
    try {
      return await this.prisma.service.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }
      throw error;
    }
  }
}
