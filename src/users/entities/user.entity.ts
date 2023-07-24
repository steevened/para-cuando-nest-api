import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../role.enum';
import { Pet } from 'src/pets/entities/pet.entity';
import { City } from 'src/cities/entities/city.entity';
import { Auth } from 'src/auth/entities/auth.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  picture: string;

  @Column({
    type: 'varchar',
    array: true,
    default: '{USER}',
    enum: Role,
  })
  roles?: Role[];

  @OneToMany(() => Pet, (pet) => pet.user)
  pets: Pet[];

  @OneToMany(() => City, (city) => city.user)
  cities: City[];

  @OneToOne(() => Auth, (auth) => auth.id)
  auth: Auth;
}
