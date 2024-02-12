import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@EntityRepository(Client)
@Injectable()
export class UserRepository extends Repository<Client> {}
