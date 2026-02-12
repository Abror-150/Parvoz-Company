import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto) {
    try {
      const created = await this.prisma.user.create({ data });

      return created;
    } catch (error) {
      console.log(error);

      throw new BadRequestException('interval server error');
    }
  }

  async findAll() {
    try {
      const data = await this.prisma.user.findMany();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const one = await this.prisma.user.findFirst({ where: { id } });
      if (!one) {
        throw new NotFoundException('user not found');
      }
      return one;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, data: UpdateUserDto) {
    await this.findOne(id);
    try {
      let updated = await this.prisma.user.update({ where: { id }, data });
      return updated;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      const deleted = await this.prisma.user.delete({ where: { id } });
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.log(error);
    }
  }
}
