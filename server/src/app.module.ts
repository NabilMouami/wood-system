import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';
import { BoisBlancModule } from './stock/boisblanc/boisblanc.module';
import { BoisDurModule } from './stock/boisdur/boisdur.module';
import { BoisBlanc } from './stock/boisblanc/entities/boisblanc.entity';
import { BoisDur } from './stock/boisdur/entities/boisdur.entity';
import { User } from './user/entities/user.entity';
import { Client } from './client/entities/client.entity';
import { Facture } from './facture/entities/facture.entity';
import { FactureBois } from './facture/entities/facturebois.entity';
import { FactureModule } from './facture/facture.module';
import { ContrePlaque } from './stock/contreplaque/entities/contreplaque.entity';
import { ContrePlaqueModule } from './stock/contreplaque/contreplaque.module';
import { Panneau } from './stock/panneau/entities/panneau.entity';
import { PanneauModule } from './stock/panneau/panneau.module';
import { BoisRouge } from './stock/boisrouge/entities/boisrouge.entity';
import { BoisRougeModule } from './stock/boisrouge/boisrouge.module';
import { DevisModule } from './devis/devis.module';
import { Devis } from './devis/entities/devis.entity';
import { DevisBois } from './devis/entities/devisbois.entity';

// FIND ALL USERS
// ADD USER
// DELETE USER

// ADD TODO BASED ON USER ID
// FIND ALL TODOS BASED ON USER ID (NOT COMPLETED)
// FIND ALL COMPLETED TODOS BASED ON USER ID (COMPLETED)
// MARK TODO AS COMPLETED BASED ON TODO ID
// DELETE TODO  BASED ON TODO ID

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.local.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD') || '',
        synchronize: true,
        logging: configService.get<boolean>('DATABASE_LOGGING'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          BoisBlanc,
          BoisDur,
          BoisRouge,
          ContrePlaque,
          Panneau,
          User,
          Client,
          Facture,
          FactureBois,
          Devis,
          DevisBois,
        ],
      }),
    }),
    UserModule,
    AuthModule,
    ClientModule,
    BoisBlancModule,
    BoisDurModule,
    BoisRougeModule,
    ContrePlaqueModule,
    PanneauModule,
    FactureModule,
    DevisModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
