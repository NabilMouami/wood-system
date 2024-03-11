import { Injectable } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { CreateBoisDurDto } from './dto/boisdur.dto';
import { BoisDur } from './entities/boisdur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoisDurService {
  constructor(
    @InjectRepository(BoisDur) private boisdurRepository: Repository<BoisDur>,
  ) {}
  create(createBolDto: CreateBoisDurDto) {
    return this.boisdurRepository.save(createBolDto);
  }

  findBoisById(id: number) {
    return this.boisdurRepository.findOneOrFail({ where: { id: id } });
  }

  findAll(): Promise<BoisDur[]> {
    return this.boisdurRepository.find();
  }

  updateBois(id: number, updateUserDetails: CreateBoisDurDto) {
    return this.boisdurRepository.update({ id }, { ...updateUserDetails });
  }
  updatePiecesBois(id: number, pieces: number) {
    return this.boisdurRepository.update({ id: id }, { pieces: pieces });
  }
  remove(id: number) {
    return this.boisdurRepository.delete(id);
  }
}
