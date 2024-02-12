import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

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
}
