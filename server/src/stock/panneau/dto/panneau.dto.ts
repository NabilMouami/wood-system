import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePNDto {
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
  @IsNumber()
  piece_total: number;
  @ApiProperty()
  long: number;
  @ApiProperty()
  larg: number;
  @ApiProperty()
  epaisseur: number;
  @ApiProperty()
  prix_unity: number;
  @ApiProperty()
  @IsString()
  date_creation: string;
  @ApiProperty()
  @IsString()
  code: string;
}
