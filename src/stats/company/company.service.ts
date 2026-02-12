import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateCompanyDto) {
    try {
      let created = await this.prisma.companyStats.create({ data });
      return created;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.companyStats.findMany();
      return all;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, data: UpdateCompanyDto) {
    try {
      let one = await this.prisma.companyStats.update({ where: { id }, data });
      if (!one) {
        throw new BadRequestException('company not found');
      }
      return one;
    } catch (error) {}
  }
}
