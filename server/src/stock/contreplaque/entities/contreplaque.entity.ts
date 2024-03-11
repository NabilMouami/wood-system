import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContrePlaque {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  marque: string;
  @Column()
  fornisseur: string;
  @Column()
  face: string;
  @Column()
  pieces: number;
  @Column('double')
  long: number;
  @Column('double')
  larg: number;
  @Column('double')
  epaisseur: number;

  @Column('double')
  prix_unity: number;
  @Column()
  date_creation: string;
}
