import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFactureBoisDto {
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
  long: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  unity: string;

  @ApiProperty()
  prix_ht: number;

  @ApiProperty()
  montant_ht: number;

  @ApiProperty()
  num_facture: number;
}
