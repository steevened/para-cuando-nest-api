import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  private convertToSlug(string: string): string {
    let slug = string.trim().toLowerCase();

    slug = slug.replace(/ /g, '-');
    slug = slug.replace(/[^a-zA-Z0-9-]/g, '');
    return slug;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { name } = createCategoryDto;
      const slug = this.convertToSlug(name);

      const category = this.categoriesRepository.create({
        ...createCategoryDto,
        slug,
      });
      await this.categoriesRepository.save(category);
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(slug: string) {
    try {
      const category = await this.categoriesRepository.findOneBy({ slug });
      if (!category)
        throw new NotFoundException(`Category with slug ${slug} not found`);
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
