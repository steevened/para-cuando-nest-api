import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../role.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Auth {
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
  })
  token: string;

  @Column({
    type: 'varchar',
    array: true,
    default: '{USER}',
    enum: Role,
  })
  roles?: Role[];

  @Column({
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
  })
  updated_at: Date;

  @OneToOne(() => User, (user) => user.id)
  user: User;
}
