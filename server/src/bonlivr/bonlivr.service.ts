import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BonLivrBois } from './entities/bonlivrbois.entity';
import { BonLivr } from './entities/bonlivr.entity';
import { User } from 'src/user/entities/user.entity';
import {
  CreateBonLivrBoisDto,
  CreateBonLivrBoisRougeDto,
} from './dto/bonlivrbois.dto';
import { CreateBonLivrDto } from './dto/bonlivr.dto';
import { Client } from 'src/client/entities/client.entity';
import { BoisBlancService } from 'src/stock/boisblanc/boisblanc.service';
import { BoisDurService } from 'src/stock/boisdur/boisdur.service';
import { PanneauService } from 'src/stock/panneau/panneau.service';
import { ContrePlaqueService } from 'src/stock/contreplaque/contreplaque.service';
import { BoisRougeService } from 'src/stock/boisrouge/boisrouge.service';

@Injectable()
export class BonLivrService {
  constructor(
    @InjectRepository(BonLivrBois)
    private fboRepository: Repository<BonLivrBois>,
    @InjectRepository(BonLivr)
    private facRepository: Repository<BonLivr>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clRepository: Repository<Client>,
    private readonly blService: BoisBlancService,
    private readonly bdService: BoisDurService,
    private readonly brService: BoisRougeService,
    private readonly pnService: PanneauService,
    private readonly cpService: ContrePlaqueService,
  ) {}

  // bonlivr item bois blanc

  async createFactureBoisBlanc(
    idbois: number,
    createBolDto: CreateBonLivrBoisDto,
  ) {
    await this.blService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  // bonlivr item bois dur
  async createFactureBoisDur(
    idbois: number,
    createBolDto: CreateBonLivrBoisDto,
  ) {
    await this.bdService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  //bonlivr item bois rouge
  async createFactureBoisRouge(
    idbois: number,
    createBolDto: CreateBonLivrBoisRougeDto,
  ) {
    await this.brService.updatePiecesBois(
      idbois,
      createBolDto.pieces,
      createBolDto.piece,
    );
    await this.brService.updateMLBois(
      createBolDto.n_fardou,
      createBolDto.metre_lineare,
    );
    return this.fboRepository.save(createBolDto);
  }
  // bonlivr Fardou bois rouge
  async createFactureBoisRougeFardou(createBolDto: CreateBonLivrBoisRougeDto) {
    await this.brService.removeFardou(createBolDto.n_fardou);
    return this.fboRepository.save(createBolDto);
  }

  // bonlivr item Panneau
  async createFacturePanneau(
    idbois: number,
    createBolDto: CreateBonLivrBoisDto,
  ) {
    await this.pnService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  // bonlivr item Contre Plaque
  async createFactureContrePlaque(
    idbois: number,
    createBolDto: CreateBonLivrBoisDto,
  ) {
    await this.cpService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  async createFacture(
    iduser: number,
    idclient: number,
    createFacDto: CreateBonLivrDto,
  ) {
    const user = await this.userRepository.findOneBy({ iduser });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create BonLivraison',
        HttpStatus.BAD_REQUEST,
      );
    const client = await this.clRepository.findOneBy({ idclient });
    if (!client)
      throw new HttpException(
        'Client not found. Cannot create BonLivraison',
        HttpStatus.BAD_REQUEST,
      );

    return this.facRepository.save({ ...createFacDto, user, client });
  }
  getFactures() {
    return this.facRepository
      .createQueryBuilder('bonlivr')
      .leftJoinAndSelect('bonlivr.user', 'user')
      .innerJoinAndSelect('bonlivr.client', 'client')
      .innerJoinAndSelect(
        BonLivrBois,
        'bonlivr_bois',
        'bonlivr.id=bonlivr_bois.num_bonlivr',
      )
      .select([
        'bonlivr.id as id',
        'bonlivr.date_creation as date_creation',
        'bonlivr.remise as remise',
        'bonlivr.reglement as reglement',
        'bonlivr.payer as payer',
        'user.firstName as firstName',
        'user.lastName as lastName',
        'client.fullName as fullName',
        '(sum(bonlivr_bois.montant_ht) * bonlivr.remise) + sum(bonlivr_bois.montant_ht) as sum',
      ])
      .groupBy('bonlivr.id')

      .execute();
  }

  async getFactureBoisByNum(numBonlivr: number): Promise<any | undefined> {
    return await this.fboRepository
      .createQueryBuilder('bonlivr_bois')
      .select(['bonlivr_bois.*'])
      .where('num_bonlivr = :numbonlivr', {
        numbonlivr: numBonlivr,
      })
      .execute();
  }

  async getLastIdFacture() {
    return await this.facRepository
      .createQueryBuilder('bonlivr')
      .select('MAX(bonlivr.id)', 'max')
      .getRawOne();
  }
}
