import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoisBlanc {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  marque: string;
  @Column()
  fornisseur: string;
  @Column()
  n_fardou: string;
  @Column()
  pieces: number;
  @Column('double')
  long: number;
  @Column('double')
  larg: number;
  @Column('double')
  epaisseur: number;
  @Column('double')
  volume: number;
  @Column('double')
  prix_achat: number;
  @Column('double')
  prix_vente: number;
  @Column()
  date_creation: string;
}
