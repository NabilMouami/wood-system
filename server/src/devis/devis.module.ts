import { Module } from '@nestjs/common';
import { DevisService } from './devis.service';
import { DevisController } from './devis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devis } from './entities/devis.entity';
import { DevisBois } from './entities/devisbois.entity';
import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Devis, DevisBois, User, Client])],
  controllers: [DevisController],
  providers: [DevisService],
  exports: [DevisService],
})
export class DevisModule {}
