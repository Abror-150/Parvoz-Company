import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: dto,
      include: { service: true }, // relation bilan Service ni ham qaytaradi
    });
  }

  async findAll() {
    return this.prisma.order.findMany({ include: { service: true } });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { service: true },
    });
  }

  async update(id: string, dto: UpdateOrderDto) {
    return this.prisma.order.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }
}
