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
import { FactureService } from './facture.service';
import { CreateFactureBoisDto } from './dto/facturebois.dto';
import { CreateFactureDto } from './dto/facture.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('facturation')
@ApiTags('Facture')
export class FactureController {
  constructor(private readonly bolService: FactureService) {}
  @ApiSecurity('JWT-auth')
  @Post('/boisblanc/:id')
  createFacBL(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateFactureBoisDto,
  ) {
    return this.bolService.createFactureBoisBlanc(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/boisdur/:id')
  createFacBD(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateFactureBoisDto,
  ) {
    return this.bolService.createFactureBoisDur(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/panneau/:id')
  createFacPN(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateFactureBoisDto,
  ) {
    return this.bolService.createFacturePanneau(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/contre-plaque/:id')
  createFacCP(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateFactureBoisDto,
  ) {
    return this.bolService.createFactureContrePlaque(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/facture/:iduser/:idclient')
  createFacture(
    @Param('iduser', ParseIntPipe) iduser: number,
    @Param('idclient', ParseIntPipe) idclient: number,
    @Body() createUserDto: CreateFactureDto,
  ) {
    return this.bolService.createFacture(iduser, idclient, createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('/factures')
  findAll(@Req() req) {
    return this.bolService.getFactures();
  }

  @ApiSecurity('JWT-auth')
  @Get('/factures/:numfacture')
  async findByNumbon(
    @Param('numfacture', ParseIntPipe) numfacture: number,
    @Req() req,
  ) {
    return this.bolService.getFactureBoisByNum(numfacture);
  }
  @ApiSecurity('JWT-auth')
  @Get('/lastid/NumFact')
  async MaxIdBonNum(@Req() req) {
    return this.bolService.getLastIdFacture();
  }
}
