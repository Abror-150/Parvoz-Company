import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactMessagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactMessageDto) {
    try {
      return await this.prisma.contactMessage.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return this.prisma.contactMessage.findMany();
  }

  async findOne(id: string) {
    const message = await this.prisma.contactMessage.findUnique({
      where: { id },
    });
    if (!message)
      throw new NotFoundException(`Contact message with ID ${id} not found`);
    return message;
  }

  async update(id: string, dto: UpdateContactMessageDto) {
    try {
      return await this.prisma.contactMessage.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Contact message with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.contactMessage.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Contact message with ID ${id} not found`);
      }
      throw new BadRequestException(error.message);
    }
  }
}
