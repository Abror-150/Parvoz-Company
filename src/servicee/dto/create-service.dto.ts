import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ example: 'Web Development' })
  title: string;

  @ApiProperty({ example: 'Full-stack web development services' })
  description: string;

  @ApiProperty({ example: 'web-icon.svg' })
  icon: string;
}
