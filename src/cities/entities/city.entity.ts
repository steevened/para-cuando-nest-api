import { Pet } from 'src/pets/entities/pet.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  country: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  slug: string;

  @Column({
    type: 'varchar',
  })
  image_url: string;

  @OneToMany((type) => Pet, (pet) => pet.city)
  pets: Pet[];
}
