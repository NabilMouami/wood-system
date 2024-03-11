import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Panneau {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
  @Column()
  marque: string;
  @Column()
  fornisseur: string;
  @Column('double')
  piece_total: number;
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
  @Column()
  code: string;
}
