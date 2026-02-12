import { ApiProperty } from '@nestjs/swagger';

export class CreateContactMessageDto {
  @ApiProperty({ example: 'Abror U.' })
  name: string;

  @ApiProperty({ example: '+998901234567' })
  phoneNumber: string;

  @ApiProperty({ example: 'Web Development' })
  service: string;

  @ApiProperty({ example: 'Please contact me in the evening' })
  message: string;
}
