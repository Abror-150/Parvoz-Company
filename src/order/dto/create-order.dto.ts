import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'Abror U.' })
  name: string;

  @ApiProperty({ example: '+998901234567' })
  phone: string;

  @ApiProperty({ example: 'service-uuid-here' })
  serviceId: string;

  @ApiProperty({ example: 'Please contact me in the evening', required: false })
  message?: string;
}
