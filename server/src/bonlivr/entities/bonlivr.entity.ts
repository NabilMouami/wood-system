import { Client } from 'src/client/entities/client.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BonLivr {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reglement: string;
  @Column()
  payer: string;
  @Column({ type: 'double' })
  remise: number;

  @Column()
  date_creation: string;
  @ManyToOne(() => User, (user) => user.factures)
  user: User;
  @ManyToOne(() => Client, (client) => client.factures)
  client: Client;
}