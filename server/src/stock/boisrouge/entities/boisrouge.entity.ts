import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BoisRouge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  //
  type: string;

  @Column()
  marque: string;

  @Column()
  fornisseur: string;

  @Column()
  n_fardou: string;
  @Column('double')
  epaisseur: number;

  @Column('double')
  larg: number;
  @Column()
  pieces: number;
  @Column('double')
  metre_lineare: number;

  @Column('double')
  prix_unity: number;

  @Column('double')
  volume: number;
  @Column('double')
  long_moyenne: number;

  @Column()
  quality: string;

  @Column()
  date_creation: string;
  @Column('double')
  long: number;
  @Column()
  piece: number;
}
