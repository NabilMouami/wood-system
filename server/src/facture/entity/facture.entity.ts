import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Facture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.factures)
  user: User;
  @ManyToOne(() => Client, (client) => client.factures)
  client: Client;

  @Column()
  reglement: string;

  @Column()
  remise: number;

  @Column()
  tva: number;

  @Column()
  date_creation: string;
}
