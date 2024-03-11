import { Module } from '@nestjs/common';
import { ContrePlaqueService } from './contreplaque.service';
import { ContrePlaqueController } from './contreplaque.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContrePlaque } from './entities/contreplaque.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ContrePlaque])],
  controllers: [ContrePlaqueController],
  providers: [ContrePlaqueService],
  exports: [ContrePlaqueService],
})
export class ContrePlaqueModule {}
