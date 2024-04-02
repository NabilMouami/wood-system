import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DevisService } from './devis.service';
import { CreateDevisBoisDto } from './dto/devisbois.dto';
import { CreateDevisDto } from './dto/devis.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('devis')
@ApiTags('Devis')
export class DevisController {
  constructor(private readonly bolService: DevisService) {}

  @ApiSecurity('JWT-auth')
  @Post('/boisdur')
  createDevisBD(@Body() createUserDto: CreateDevisBoisDto) {
    return this.bolService.createDevisBoisDur(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Post('/contre-plaque')
  createDevisCP(@Body() createUserDto: CreateDevisBoisDto) {
    return this.bolService.createDevisContrePlaque(createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/panneau')
  createDevisPN(@Body() createUserDto: CreateDevisBoisDto) {
    return this.bolService.createDevisPanneau(createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/:id')
  createFacBL(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateDevisBoisDto,
  ) {
    return this.bolService.createDevisBandChant(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Post('/:iduser/:idclient')
  createFacture(
    @Param('iduser', ParseIntPipe) iduser: number,
    @Param('idclient', ParseIntPipe) idclient: number,
    @Body() createUserDto: CreateDevisDto,
  ) {
    return this.bolService.createDevis(iduser, idclient, createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('')
  findAll(@Req() req) {
    return this.bolService.getDevis();
  }

  @ApiSecurity('JWT-auth')
  @Get('/:numdevis')
  async findByNumbon(
    @Param('numdevis', ParseIntPipe) numdevis: number,
    @Req() req,
  ) {
    return this.bolService.getDevisBDByNum(numdevis);
  }
  @ApiSecurity('JWT-auth')
  @Get('/lastid/NumDev')
  async MaxIdBonNum(@Req() req) {
    return this.bolService.getLastIdDevis();
  }
}
