import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBoisDurDto {
  //
  @ApiProperty()
  @IsString()
  marque: string;

  @ApiProperty()
  @IsString()
  fornisseur: string;

  @ApiProperty()
  @IsString()
  n_fardou: string;

  @ApiProperty()
  pieces: number;

  @ApiProperty()
  long: number;

  @ApiProperty()
  @IsNumber()
  larg: number;

  @ApiProperty()
  epaisseur: number;

  @ApiProperty()
  volume: number;

  @ApiProperty()
  prix_achat: number;
  @ApiProperty()
  prix_vente: number;
  @ApiProperty()
  @IsString()
  date_creation: string;
}
