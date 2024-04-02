import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactureBois } from './entities/facturebois.entity';
import { Facture } from './entities/facture.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateFactureBoisDto } from './dto/facturebois.dto';
import { CreateFactureDto } from './dto/facture.dto';
import { Client } from 'src/client/entities/client.entity';
import { BoisBlancService } from 'src/stock/boisblanc/boisblanc.service';
import { BoisDurService } from 'src/stock/boisdur/boisdur.service';
import { PanneauService } from 'src/stock/panneau/panneau.service';
import { ContrePlaqueService } from 'src/stock/contreplaque/contreplaque.service';
import { BoisRougeService } from 'src/stock/boisrouge/boisrouge.service';

@Injectable()
export class FactureService {
  constructor(
    @InjectRepository(FactureBois)
    private fboRepository: Repository<FactureBois>,
    @InjectRepository(Facture)
    private facRepository: Repository<Facture>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clRepository: Repository<Client>,
    private readonly blService: BoisBlancService,
    private readonly bdService: BoisDurService,
    private readonly brService: BoisRougeService,
    private readonly pnService: PanneauService,
    private readonly cpService: ContrePlaqueService,
  ) {}

  // factur item bois blanc

  async createFactureBoisBlanc(
    idbois: number,
    createBolDto: CreateFactureBoisDto,
  ) {
    await this.blService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  // factur item bois dur
  async createFactureBoisDur(
    idbois: number,
    createBolDto: CreateFactureBoisDto,
  ) {
    await this.bdService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  // factur item bois rouge
  async createFactureBoisRouge(
    idbois: number,
    createBolDto: CreateFactureBoisDto,
  ) {
    await this.brService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  // factur item Panneau
  async createFacturePanneau(
    idbois: number,
    createBolDto: CreateFactureBoisDto,
  ) {
    await this.pnService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  // factur item Contre Plaque
  async createFactureContrePlaque(
    idbois: number,
    createBolDto: CreateFactureBoisDto,
  ) {
    await this.cpService.updatePiecesBois(idbois, createBolDto.pieces);
    return this.fboRepository.save(createBolDto);
  }
  async createFacture(
    iduser: number,
    idclient: number,
    createFacDto: CreateFactureDto,
  ) {
    const user = await this.userRepository.findOneBy({ iduser });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Facture',
        HttpStatus.BAD_REQUEST,
      );
    const client = await this.clRepository.findOneBy({ idclient });
    if (!client)
      throw new HttpException(
        'Client not found. Cannot create Facture',
        HttpStatus.BAD_REQUEST,
      );

    return this.facRepository.save({ ...createFacDto, user, client });
  }
  getFactures() {
    return this.facRepository
      .createQueryBuilder('facture')
      .leftJoinAndSelect('facture.user', 'user')
      .innerJoinAndSelect('facture.client', 'client')
      .innerJoinAndSelect(
        FactureBois,
        'facture_bois',
        'facture.id=facture_bois.num_facture',
      )
      .select([
        'facture.id as id',
        'facture.date_creation as date_creation',
        'facture.tva as tva',
        'facture.remise as remise',
        'facture.reglement as reglement',
        'facture.payer as payer',
        'user.firstName as firstName',
        'user.lastName as lastName',
        'client.fullName as fullName',
        '(sum(facture_bois.montant_ht) * facture.remise * facture.tva) + sum(facture_bois.montant_ht) as sum',
      ])
      .groupBy('facture.id')

      .execute();
  }

  async getFactureBoisByNum(numFacture: number): Promise<any | undefined> {
    return await this.fboRepository
      .createQueryBuilder('facture_bois')
      .select(['facture_bois.*'])
      .where('num_facture = :numfacture', {
        numfacture: numFacture,
      })
      .execute();
  }

  async getLastIdFacture() {
    return await this.facRepository
      .createQueryBuilder('fact')
      .select('MAX(fact.id)', 'max')
      .getRawOne();
  }
}
