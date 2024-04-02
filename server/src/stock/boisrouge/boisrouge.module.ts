import { Module } from '@nestjs/common';
import { BoisRougeService } from './boisrouge.service';
import { BoisRougeController } from './boisrouge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoisRouge } from './entities/boisrouge.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BoisRouge])],
  controllers: [BoisRougeController],
  providers: [BoisRougeService],
  exports: [BoisRougeService],
})
export class BoisRougeModule {}
