import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty()
  clientsCount: number;
  @ApiProperty()
  projectsCount: number;
  @ApiProperty()
  experienceYears: number;
  @ApiProperty()
  teamMembers: number;
}
