import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role.enum';

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
}
