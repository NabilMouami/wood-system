import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBonLivrDto {
  @ApiProperty()
  @IsString()
  reglement: string;
  @ApiProperty()
  @IsString()
  payer: string;
  @ApiProperty()
  remise: number;
  @ApiProperty()
  @IsString()
  date_creation: string;
}
