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
import { CreatePNDto } from './dto/panneau.dto';
import { PanneauService } from './panneau.service';

import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('Panneau')
export class PanneauController {
  constructor(private readonly pnService: PanneauService) {}
  @ApiSecurity('JWT-auth')
  @Post('/panneau')
  create(@Body() createUserDto: CreatePNDto) {
    return this.pnService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('panneau/:id')
  findUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.pnService.findBoisById(id);
  }
  @ApiSecurity('JWT-auth')
  @Get('/panneau')
  findAll(@Req() req) {
    return this.pnService.findAll();
  }
  @ApiSecurity('JWT-auth')
  @Put('/panneau/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBoisDto: CreatePNDto,
  ) {
    await this.pnService.updateBois(id, createBoisDto);
  }

  @ApiSecurity('JWT-auth')
  @Patch('/panneau/:id/:pieces')
  async updatePieseDeBois(
    @Param('id', ParseIntPipe) id: number,
    @Param('pieces', ParseIntPipe) pieces: number,
  ) {
    await this.pnService.updatePiecesBois(id, pieces);
  }

  @ApiSecurity('JWT-auth')
  @Delete('/panneau/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.pnService.remove(+id);
  }
}
