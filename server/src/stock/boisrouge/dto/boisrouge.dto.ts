import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBoisRougeDto {
  //
  @ApiProperty()
  @IsString()
  type: string;

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
  epaisseur: number;

  @ApiProperty()
  @IsNumber()
  larg: number;
  @ApiProperty()
  pieces: number;
  @ApiProperty()
  metre_lineare: number;

  @ApiProperty()
  prix_unity: number;

  @ApiProperty()
  volume: number;
  @ApiProperty()
  long_moyenne: number;

  @ApiProperty()
  @IsString()
  quality: string;

  @ApiProperty()
  @IsString()
  date_creation: string;
  @ApiProperty()
  long: number;
  @ApiProperty()
  piece: number;
}
