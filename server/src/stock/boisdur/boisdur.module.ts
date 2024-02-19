import { Module } from '@nestjs/common';
import { BoisDurService } from './boisdur.service';
import { BoisDurController } from './boisdur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoisDur } from './entities/boisdur.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BoisDur])],
  controllers: [BoisDurController],
  providers: [BoisDurService],
  exports: [BoisDurService],
})
export class BoisDurModule {}
