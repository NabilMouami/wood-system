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
import { BoisBlancService } from './boisblanc.service';
import { CreateBoisBlancDto } from './dto/boisblanc.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('Bois-Blanc')
export class BoisBlancController {
  constructor(private readonly bolService: BoisBlancService) {}
  @ApiSecurity('JWT-auth')
  @Post('/boisblanc')
  create(@Body() createUserDto: CreateBoisBlancDto) {
    return this.bolService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('boisblanc/:id')
  findUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.bolService.findBoisById(id);
  }
  @ApiSecurity('JWT-auth')
  @Get('/boisblanc')
  findAll(@Req() req) {
    return this.bolService.findAll();
  }
  @ApiSecurity('JWT-auth')
  @Put('/boisblanc/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBoisDto: CreateBoisBlancDto,
  ) {
    await this.bolService.updateBois(id, createBoisDto);
  }

  @ApiSecurity('JWT-auth')
  @Patch('/boisblanc/:id/:pieces')
  async updatePieseDeBois(
    @Param('id', ParseIntPipe) id: number,
    @Param('pieces', ParseIntPipe) pieces: number,
  ) {
    await this.bolService.updatePiecesBois(id, pieces);
  }

  @ApiSecurity('JWT-auth')
  @Delete('/boisblanc/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.bolService.remove(+id);
  }
}
