import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevisBois } from './entities/devisbois.entity';
import { Devis } from './entities/devis.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateDevisBoisDto } from './dto/devisbois.dto';
import { CreateDevisDto } from './dto/devis.dto';
import { Client } from 'src/client/entities/client.entity';

@Injectable()
export class DevisService {
  constructor(
    @InjectRepository(DevisBois)
    private fboRepository: Repository<DevisBois>,
    @InjectRepository(Devis)
    private facRepository: Repository<Devis>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Client) private clRepository: Repository<Client>,
  ) {}
  async createDevisBoisDur(createBolDto: CreateDevisBoisDto) {
    return this.fboRepository.save(createBolDto);
  }
  async createDevisContrePlaque(createBolDto: CreateDevisBoisDto) {
    return this.fboRepository.save(createBolDto);
  }
  async createDevisPanneau(createBolDto: CreateDevisBoisDto) {
    return this.fboRepository.save(createBolDto);
  }
  async createDevisBandChant(createBolDto: CreateDevisBoisDto) {
    return this.fboRepository.save(createBolDto);
  }

  async createDevis(
    iduser: number,
    idclient: number,
    createFacDto: CreateDevisDto,
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
  getDevis() {
    return this.facRepository
      .createQueryBuilder('devis')
      .leftJoinAndSelect('devis.user', 'user')
      .innerJoinAndSelect('devis.client', 'client')
      .innerJoinAndSelect(
        DevisBois,
        'devis_bois',
        'devis.id=devis_bois.num_devis',
      )
      .select([
        'devis.id as id',
        'devis.date_creation as date_creation',
        'user.firstName as firstName',
        'user.lastName as lastName',
        'client.fullName as fullName',
        'sum(devis_bois.montant_ht) as sum',
      ])
      .groupBy('devis.id')

      .execute();
  }

  async getDevisBDByNum(numDevis: number): Promise<any | undefined> {
    return await this.fboRepository
      .createQueryBuilder('devis_bois')
      .select(['devis_bois.*'])
      .where('num_devis = :numdevis', {
        numdevis: numDevis,
      })
      .execute();
  }

  async getLastIdDevis() {
    return await this.facRepository
      .createQueryBuilder('devis')
      .select('MAX(devis.id)', 'max')
      .getRawOne();
  }
}
