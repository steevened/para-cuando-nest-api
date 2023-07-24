import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from '../role.enum';

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
        // return `user ${createUserDto.email} created`;
        const newUser = this.usersRepository.create({
          ...createUserDto,
          roles: [Role.USER],
        });
        return this.usersRepository.save(newUser);
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMe() {
    return 'This action returns my user information';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
