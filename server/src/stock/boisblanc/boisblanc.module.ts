import { Module } from '@nestjs/common';
import { BoisBlancService } from './boisblanc.service';
import { BoisBlancController } from './boisblanc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoisBlanc } from './entities/boisblanc.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BoisBlanc])],
  controllers: [BoisBlancController],
  providers: [BoisBlancService],
  exports: [BoisBlancService],
})
export class BoisBlancModule {}
