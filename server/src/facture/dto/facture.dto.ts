import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFactureDto {
  //
  @ApiProperty()
  @IsNumber()
  user_id: number;

  @ApiProperty()
  @IsNumber()
  client_id: number;

  @ApiProperty()
  @IsString()
  reglement: string;

  @ApiProperty()
  @IsNumber()
  remise: number;

  @ApiProperty()
  @IsNumber()
  tva: number;

  @ApiProperty()
  @IsString()
  date_creation: string;
}
