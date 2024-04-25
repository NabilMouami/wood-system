import { Injectable } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { CreateBoisRougeDto } from './dto/boisrouge.dto';
import { BoisRouge } from './entities/boisrouge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoisRougeService {
  constructor(
    @InjectRepository(BoisRouge)
    private boisrougeRepository: Repository<BoisRouge>,
  ) {}
  create(createBolDto: CreateBoisRougeDto) {
    return this.boisrougeRepository.save(createBolDto);
  }

  findBoisById(id: number) {
    return this.boisrougeRepository.findOneOrFail({ where: { id: id } });
  }

  findAll(): Promise<BoisRouge[]> {
    return this.boisrougeRepository.find();
  }

  findAllFardou() {
    return this.boisrougeRepository
      .createQueryBuilder('bois_rouge')

      .select(['DISTINCT n_fardou,quality'])

      .execute();
  }

  updateBois(id: number, updateUserDetails: CreateBoisRougeDto) {
    return this.boisrougeRepository.update({ id }, { ...updateUserDetails });
  }
  updatePiecesBois(id: number, pieces: number, piece: number) {
    this.boisrougeRepository.update(
      { id: id },
      { pieces: pieces, piece: piece },
    );
  }
  updateMLBois(n_fardou: string, metre_lineare: number) {
    this.boisrougeRepository.update(
      { n_fardou: n_fardou },
      { metre_lineare: metre_lineare },
    );
  }
  remove(id: number) {
    return this.boisrougeRepository.delete(id);
  }
  removeFardou(n_fardou: string) {
    return this.boisrougeRepository.delete({ n_fardou: n_fardou });
  }
}
