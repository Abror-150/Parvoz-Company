import { ApiProperty } from '@nestjs/swagger';
import { ProjectType } from '@prisma/client';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Web App' })
  title: string;

  @ApiProperty({ example: 'project-image.png' })
  image: string;

  @ApiProperty({ example: 'https://mywebapp.com' })
  url: string;

  @ApiProperty({ enum: ProjectType })
  type: ProjectType;
}
