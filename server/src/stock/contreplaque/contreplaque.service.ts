import { Injectable } from '@nestjs/common';
import { CreateCPDto } from './dto/contreplaque.dto';
import { ContrePlaque } from './entities/contreplaque.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContrePlaqueService {
  constructor(
    @InjectRepository(ContrePlaque)
    private bolRepository: Repository<ContrePlaque>,
  ) {}
  create(createBolDto: CreateCPDto) {
    return this.bolRepository.save(createBolDto);
  }

  findBoisById(id: number) {
    return this.bolRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.bolRepository.find();
  }

  updateBois(id: number, updateUserDetails: CreateCPDto) {
    return this.bolRepository.update({ id }, { ...updateUserDetails });
  }
  updatePiecesBois(id: number, pieces: number) {
    return this.bolRepository.update({ id: id }, { pieces: pieces });
  }
  remove(id: number) {
    return this.bolRepository.delete(id);
  }
}
