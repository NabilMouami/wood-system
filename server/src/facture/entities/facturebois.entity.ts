import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FactureBois {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  designation: string;
  @Column()
  qte: number;
  @Column()
  pieces: number;

  @Column('double')
  quantity: number;
  @Column('double')
  long: number;
  @Column()
  unity: string;
  @Column('double')
  prix_ht: number;
  @Column('double')
  montant_ht: number;
  @Column()
  num_facture: number;
  @Column('double')
  remise: number;
}
