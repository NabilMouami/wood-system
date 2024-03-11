import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFactureDto {
  @ApiProperty()
  @IsString()
  reglement: string;

  @ApiProperty()
  remise: number;

  @ApiProperty()
  @IsNumber()
  tva: number;

  @ApiProperty()
  @IsString()
  date_creation: string;
}
