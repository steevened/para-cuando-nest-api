import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
  ) {}

  async create(createCityDto: CreateCityDto) {
    try {
      const city = this.citiesRepository.create(createCityDto);
      await this.citiesRepository.save(city);
      return city;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.citiesRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} city`;
  }

  update(id: string, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: string) {
    return `This action removes a #${id} city`;
  }
}
