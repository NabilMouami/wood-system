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
  Patch,
} from '@nestjs/common';
import { CreateCPDto } from './dto/contreplaque.dto';
import { ContrePlaque } from './entities/contreplaque.entity';
import { ContrePlaqueService } from './contreplaque.service';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('Contre-Plaque')
export class ContrePlaqueController {
  constructor(private readonly cpService: ContrePlaqueService) {}
  @ApiSecurity('JWT-auth')
  @Post('/contre-plaque')
  create(@Body() createUserDto: CreateCPDto) {
    return this.cpService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('contre-plaque/:id')
  findUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.cpService.findBoisById(id);
  }
  @ApiSecurity('JWT-auth')
  @Get('/contre-plaque')
  findAll(@Req() req) {
    return this.cpService.findAll();
  }
  @ApiSecurity('JWT-auth')
  @Put('/contre-plaque/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBoisDto: CreateCPDto,
  ) {
    await this.cpService.updateBois(id, createBoisDto);
  }

  @ApiSecurity('JWT-auth')
  @Patch('/contre-plaque/:id/:pieces')
  async updatePieseDeBois(
    @Param('id', ParseIntPipe) id: number,
    @Param('pieces', ParseIntPipe) pieces: number,
  ) {
    await this.cpService.updatePiecesBois(id, pieces);
  }

  @ApiSecurity('JWT-auth')
  @Delete('/contre-plaque/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.cpService.remove(+id);
  }
}
