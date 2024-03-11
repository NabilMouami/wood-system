import { Facture } from 'src/facture/entities/facture.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  idclient: number;

  @Column()
  fullName: string;

  @Column()
  ville: string;

  @Column()
  adresse: string;

  @Column()
  phone: string;

  @Column()
  cne: string;

  @OneToMany(() => Facture, (post) => post.client)
  factures: Facture[];
}
