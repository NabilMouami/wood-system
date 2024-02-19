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
        entities: [BoisBlanc, BoisDur, User, Client],
      }),
    }),
    UserModule,
    AuthModule,
    ClientModule,
    BoisBlancModule,
    BoisDurModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
