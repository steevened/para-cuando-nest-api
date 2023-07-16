import { City } from 'src/cities/entities/city.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PetKind } from '../enums/pets.enum';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: PetKind,
  })
  kind: PetKind;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  breed?: string;

  @ManyToOne((type) => City, (city) => city.pets)
  city: City;
}
