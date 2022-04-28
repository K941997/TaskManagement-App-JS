/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './schema/category.schema';
import { Model, FilterQuery } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from 'src/categories/dto/createCategory.dto';
import { CategoryRepository } from './schema/categories-mongo-db.repository';

@Injectable()
export class CategoriesMongoDbService {
    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    async getOneCategoryById(id: string): Promise<Category> {
        return this.categoryRepository.findOne({id});
    }

    async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.findAll({});
    }

    

 
}
