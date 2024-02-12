import { Injectable } from '@nestjs/common';
import { Constants } from 'src/utils/constants';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    let user: Client = new Client();
    user.fullName = createClientDto.fullname;
    user.ville = createClientDto.ville;
    user.adresse = createClientDto.adresse;
    user.phone = createClientDto.phone;
    user.cne = createClientDto.cne;
    return this.clientRepository.save(user);
  }

  findClientById(id: number) {
    return this.clientRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.clientRepository.find();
  }

  updateClient(id: number, updateUserDetails: CreateClientDto) {
    return this.clientRepository.update({ id }, { ...updateUserDetails });
  }
  remove(id: number) {
    return this.clientRepository.delete(id);
  }
}
