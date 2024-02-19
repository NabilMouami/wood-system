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
import { BoisDurService } from './boisdur.service';
import { CreateBoisDurDto } from './dto/boisdur.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('stock')
@ApiTags('Bois-Dur')
export class BoisDurController {
  constructor(private readonly bodService: BoisDurService) {}
  @ApiSecurity('JWT-auth')
  @Post('/boisdur')
  create(@Body() createUserDto: CreateBoisDurDto) {
    return this.bodService.create(createUserDto);
  }

  @ApiSecurity('JWT-auth')
  @Get('boisdur/:id')
  findUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.bodService.findBoisById(id);
  }
  @ApiSecurity('JWT-auth')
  @Get('/boisdur')
  findAll(@Req() req) {
    return this.bodService.findAll();
  }
  @ApiSecurity('JWT-auth')
  @Put('/boisdur/:id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBoisDto: CreateBoisDurDto,
  ) {
    await this.bodService.updateBois(id, createBoisDto);
  }
  @ApiSecurity('JWT-auth')
  @Delete('/boisdur/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.bodService.remove(+id);
  }
}
