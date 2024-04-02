import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDevisDto {
  @ApiProperty()
  @IsString()
  date_creation: string;
}
