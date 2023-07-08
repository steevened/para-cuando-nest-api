import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.findOneByEmail(createUserDto.email);
      if (!user) {
        return `user ${createUserDto.email} created`;
        // const newUser = this.usersRepository.create({
        //   ...createUserDto,
        //   roles: [Role.USER],
        // });
        // return this.usersRepository.save(newUser);
      }

      return `user ${createUserDto.email} already exists`;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByEmail(email: string) {
    try {
      return this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
