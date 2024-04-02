import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDevisBoisDto {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  designation: string;

  @ApiProperty()
  qte: number;
  @ApiProperty()
  pieces: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  long: number;

  @ApiProperty()
  unity: string;

  @ApiProperty()
  prix_ht: number;

  @ApiProperty()
  montant_ht: number;

  @ApiProperty()
  num_devis: number;
}
