/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesMongoDbController } from './categories-mongo-db.controller';
import { CategoriesMongoDbService } from './categories-mongo-db.service';
import { Category, CategorySchema } from './schema/category.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])], //!'Category' to Service
  controllers: [CategoriesMongoDbController],
  providers: [CategoriesMongoDbService]
})
export class CategoriesMongoDbModule {}
