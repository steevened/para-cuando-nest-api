import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { City } from './cities/entities/city.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { PetsModule } from './pets/pets.module';
import { Pet } from './pets/entities/pet.entity';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      entities: [City, User, Category, Pet, Auth],
    }),
    CitiesModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    PetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
