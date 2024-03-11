import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCPDto {
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
  face: string;
  @ApiProperty()
  @IsNumber()
  pieces: number;
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
}
