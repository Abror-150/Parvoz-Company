import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  position: string;
}
