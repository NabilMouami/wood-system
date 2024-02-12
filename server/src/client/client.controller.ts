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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('clients')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @ApiSecurity('JWT-auth')
  @Post('/client')
  create(@Body(ValidationPipe) createUserDto: CreateClientDto) {
    console.log(createUserDto);
    return this.clientService.create(createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Get(':id')
  findUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.clientService.findClientById(id);
  }
  @ApiSecurity('JWT-auth')
  @Get()
  findAll(@Req() req) {
    return this.clientService.findAll();
  }
  @ApiSecurity('JWT-auth')
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateClientDto,
  ) {
    await this.clientService.updateClient(id, createUserDto);
  }
  @ApiSecurity('JWT-auth')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.clientService.remove(+id);
  }
}
