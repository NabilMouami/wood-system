import { Module } from '@nestjs/common';
import { FactureService } from './facture.service';
import { FactureController } from './facture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facture } from './entities/facture.entity';
import { FactureBois } from './entities/facturebois.entity';
import { User } from 'src/user/entities/user.entity';
import { Client } from 'src/client/entities/client.entity';
import { BoisBlancService } from 'src/stock/boisblanc/boisblanc.service';
import { BoisBlanc } from 'src/stock/boisblanc/entities/boisblanc.entity';
import { BoisDur } from 'src/stock/boisdur/entities/boisdur.entity';
import { BoisDurService } from 'src/stock/boisdur/boisdur.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Facture,
      FactureBois,
      User,
      Client,
      BoisBlanc,
      BoisDur,
    ]),
  ],
  controllers: [FactureController],
  providers: [FactureService, BoisBlancService, BoisDurService],
  exports: [FactureService],
})
export class FactureModule {}
