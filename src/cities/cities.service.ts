import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findOne(id: string) {
    try {
      const city = await this.citiesRepository.findOneBy({ id });
      if (!city) throw new NotFoundException(`City with id ${id} not found`);
      return city;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOneBySlug(slug: string) {
    try {
      const city = await this.citiesRepository.findOneBy({ slug });
      if (!city)
        throw new NotFoundException(`City with slug ${slug} not found`);
      return city;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    const city = await this.citiesRepository.preload({
      id,
      ...updateCityDto,
    });
    if (!city) throw new NotFoundException(`City with id ${id} not found`);

    try {
      await this.citiesRepository.save(city);
      return city;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    const city = await this.findOne(id);
    try {
      await this.citiesRepository.delete(city);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
