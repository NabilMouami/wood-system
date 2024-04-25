import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBonLivrBoisDto {
  //
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
  num_facture: number;

  @ApiProperty()
  remise: number;
}
export class CreateBonLivrBoisRougeDto {
  //
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
  piece: number;

  @ApiProperty()
  metre_lineare: number;
  @ApiProperty()
  n_fardou: string;

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
  num_bonlivr: number;

  @ApiProperty()
  remise: number;
}
