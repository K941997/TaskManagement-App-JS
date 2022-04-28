/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./category.schema";
import { Model, FilterQuery } from "mongoose";
 
@Injectable()
export class CategoryRepository {
    //todo: NoSQL MongoDB phải có Repository riêng để lấy dữ liệu Database:
    constructor(
        @InjectModel(Category.name) //!'Category' from Module
        private readonly categoryModel: Model<CategoryDocument> //!Inject Model MongoDB
    ) {}

    async create (category: Category): Promise<Category> {
        const newCategory = new this.categoryModel(category);
        return newCategory.save()
    }

    async findAll(categoryFilterQuery: FilterQuery<Category>): Promise<Category[]> {
        return this.categoryModel.find(categoryFilterQuery)
    }

    async findOne(categoryFilterQuery: FilterQuery<Category>): Promise<Category> { //FIlterQuery from 'mongoose'
        return this.categoryModel.findOne(categoryFilterQuery)
    }

    async update (categoryFilterQuery: FilterQuery<Category>, category: Partial<Category>): Promise<Category> {
        return this.categoryModel.findOneAndUpdate(categoryFilterQuery, category);
    }
}