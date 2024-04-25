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
import { BonLivrService } from './bonlivr.service';
import {
  CreateBonLivrBoisDto,
  CreateBonLivrBoisRougeDto,
} from './dto/bonlivrbois.dto';
import { CreateBonLivrDto } from './dto/bonlivr.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('bonlivraison')
@ApiTags('BonLivraison')
export class BonLivrController {
  constructor(private readonly bolService: BonLivrService) {}
  @ApiSecurity('JWT-auth')
  @Post('/boisblanc/:id')
  createFacBL(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateBonLivrBoisDto,
  ) {
    return this.bolService.createFactureBoisBlanc(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/boisdur/:id')
  createFacBD(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateBonLivrBoisDto,
  ) {
    return this.bolService.createFactureBoisDur(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/boisrouge/:id')
  createFacBR(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateBonLivrBoisRougeDto,
  ) {
    return this.bolService.createFactureBoisRouge(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/boisrougefardou')
  createFacBRFardou(@Body() createUserDto: CreateBonLivrBoisRougeDto) {
    return this.bolService.createFactureBoisRougeFardou(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Post('/panneau/:id')
  createFacPN(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateBonLivrBoisDto,
  ) {
    return this.bolService.createFacturePanneau(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/contre-plaque/:id')
  createFacCP(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateBonLivrBoisDto,
  ) {
    return this.bolService.createFactureContrePlaque(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Post('/:iduser/:idclient')
  createFacture(
    @Param('iduser', ParseIntPipe) iduser: number,
    @Param('idclient', ParseIntPipe) idclient: number,
    @Body() createUserDto: CreateBonLivrDto,
  ) {
    return this.bolService.createFacture(iduser, idclient, createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('/bons')
  findAll(@Req() req) {
    return this.bolService.getFactures();
  }

  @ApiSecurity('JWT-auth')
  @Get('/bons/:numbonlivr')
  async findByNumbon(
    @Param('numbonlivr', ParseIntPipe) numbonlivr: number,
    @Req() req,
  ) {
    return this.bolService.getFactureBoisByNum(numbonlivr);
  }
  @ApiSecurity('JWT-auth')
  @Get('/lastid/NumBonLivr')
  async MaxIdBonNum(@Req() req) {
    return this.bolService.getLastIdFacture();
  }
}
