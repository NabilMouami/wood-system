import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty()
  @IsString()
  fullname: string;

  @ApiProperty()
  @IsString()
  ville: string;

  @ApiProperty()
  @IsString()
  adresse: string;

  @ApiProperty()
  @IsString()
  phone: string;
  @ApiProperty()
  @IsString()
  cne: string;
}
