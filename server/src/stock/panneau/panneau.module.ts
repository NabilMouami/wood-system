import { Module } from '@nestjs/common';
import { PanneauService } from './panneau.service';
import { PanneauController } from './panneau.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Panneau } from './entities/panneau.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Panneau])],
  controllers: [PanneauController],
  providers: [PanneauService],
  exports: [PanneauService],
})
export class PanneauModule {}
