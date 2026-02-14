import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    try {
      return await this.prisma.order.create({
        data: dto,
        include: { service: true },
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `Service with ID ${dto.serviceId} not found`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { service: true } });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { service: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async update(id: string, dto: UpdateOrderDto) {
    try {
      return await this.prisma.order.update({
        where: { id },
        data: dto,
        include: { service: true },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      if (error.code === 'P2003') {
        throw new NotFoundException(
          `Service with ID ${dto.serviceId} not found`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.order.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      throw error;
    }
  }
}
