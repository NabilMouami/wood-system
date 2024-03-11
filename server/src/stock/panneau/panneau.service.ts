import { Injectable } from '@nestjs/common';
import { CreatePNDto } from './dto/panneau.dto';
import { Panneau } from './entities/panneau.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PanneauService {
  constructor(
    @InjectRepository(Panneau)
    private bolRepository: Repository<Panneau>,
  ) {}
  create(createBolDto: CreatePNDto) {
    return this.bolRepository.save(createBolDto);
  }

  findBoisById(id: number) {
    return this.bolRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.bolRepository.find();
  }

  updateBois(id: number, updateUserDetails: CreatePNDto) {
    return this.bolRepository.update({ id }, { ...updateUserDetails });
  }
  updatePiecesBois(id: number, pieces: number) {
    return this.bolRepository.update({ id: id }, { piece_total: pieces });
  }
  remove(id: number) {
    return this.bolRepository.delete(id);
  }
}
