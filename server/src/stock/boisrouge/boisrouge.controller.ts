import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { BoisRougeService } from './boisrouge.service';
import { CreateBoisRougeDto } from './dto/boisrouge.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('Bois-Rouge')
export class BoisRougeController {
  constructor(private readonly bodService: BoisRougeService) {}
  @ApiSecurity('JWT-auth')
  @Post('/boisrouge')
  create(@Body() createUserDto: CreateBoisRougeDto) {
    return this.bodService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('boisrouge/:id')
  findUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.bodService.findBoisById(id);
  }
  @ApiSecurity('JWT-auth')
  @Get('/boisrouge')
  findAll(@Req() req) {
    return this.bodService.findAll();
  }
  @ApiSecurity('JWT-auth')
  @Get('/boisrougefardou')
  findAllByFardou(@Req() req) {
    return this.bodService.findAllFardou();
  }
  @ApiSecurity('JWT-auth')
  @Put('/boisrouge/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBoisDto: CreateBoisRougeDto,
  ) {
    await this.bodService.updateBois(id, createBoisDto);
  }
  @ApiSecurity('JWT-auth')
  @Delete('/boisrouge/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.bodService.remove(+id);
  }
}
