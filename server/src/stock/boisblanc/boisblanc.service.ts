import { Injectable } from '@nestjs/common';
import { CreateBoisBlancDto } from './dto/boisblanc.dto';
import { BoisBlanc } from './entities/boisblanc.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoisBlancService {
  constructor(
    @InjectRepository(BoisBlanc) private bolRepository: Repository<BoisBlanc>,
  ) {}
  create(createBolDto: CreateBoisBlancDto) {
    return this.bolRepository.save(createBolDto);
  }

  findBoisById(id: number) {
    return this.bolRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.bolRepository.find();
  }

  updateBois(id: number, updateUserDetails: CreateBoisBlancDto) {
    return this.bolRepository.update({ id }, { ...updateUserDetails });
  }
  updatePiecesBois(id: number, pieces: number) {
    return this.bolRepository.update({ id: id }, { pieces: pieces });
  }
  remove(id: number) {
    return this.bolRepository.delete(id);
  }
}
