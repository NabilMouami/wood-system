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
import { ContrePlaque } from 'src/stock/contreplaque/entities/contreplaque.entity';
import { Panneau } from 'src/stock/panneau/entities/panneau.entity';
import { ContrePlaqueService } from 'src/stock/contreplaque/contreplaque.service';
import { PanneauService } from 'src/stock/panneau/panneau.service';
import { BoisRougeService } from 'src/stock/boisrouge/boisrouge.service';
import { BoisRouge } from 'src/stock/boisrouge/entities/boisrouge.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Facture,
      FactureBois,
      User,
      Client,
      BoisBlanc,
      BoisDur,
      BoisRouge,
      ContrePlaque,
      Panneau,
    ]),
  ],
  controllers: [FactureController],
  providers: [
    FactureService,
    BoisBlancService,
    BoisDurService,
    BoisRougeService,
    ContrePlaqueService,
    PanneauService,
  ],
  exports: [FactureService],
})
export class FactureModule {}
