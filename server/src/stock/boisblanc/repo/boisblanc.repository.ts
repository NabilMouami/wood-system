import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { BoisBlanc } from '../entities/boisblanc.entity';

@EntityRepository(BoisBlanc)
@Injectable()
export class UserRepository extends Repository<BoisBlanc> {}
