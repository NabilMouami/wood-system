import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { BonLivrController } from './bonlivr.controller';
import { BonLivr } from './entities/bonlivr.entity';
import { BonLivrBois } from './entities/bonlivrbois.entity';
import { BonLivrService } from './bonlivr.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      BonLivr,
      BonLivrBois,
      User,
      Client,
      BoisBlanc,
      BoisDur,
      BoisRouge,
      ContrePlaque,
      Panneau,
    ]),
  ],
  controllers: [BonLivrController],
  providers: [
    BonLivrService,
    BoisBlancService,
    BoisDurService,
    BoisRougeService,
    ContrePlaqueService,
    PanneauService,
  ],
  exports: [BonLivrService],
})
export class BonLivrModule {}
