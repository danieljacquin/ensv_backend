import { In } from "typeorm";

import { CategoryEntity } from "../Entity/category-entity";
import { dataSource } from "../config";
import { CreateCategoryDto } from "../dto/category/create-category.dto";
import { FindOneCategoryDto } from "../dto/category/find-one-category.dto";
import { UpdateCategoryDto } from "../dto/category/update-category.dto";
import { CustomError } from "../error/custom-error";
import CategoryMapper from "../mappers/category/category_mapper";
import { Category } from "../model";
import NoteMapper from "../mappers/note/note-mapper";

export class CategoryService {

    public categoryRepository = dataSource.getRepository(Category);

    async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {

        const { name } = createCategoryDto;
        try {

            const exists = await this.categoryRepository.findOne({
                where: {
                    name
                }
            });

            if (exists) throw CustomError.badRequest('Category already exists');

            const category = await this.categoryRepository.save({ name });

            return CategoryMapper.categoryModelToObject(category);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async getAll(): Promise<CategoryEntity[]> {
        const data = await this.categoryRepository.find();
        return data.map(category => CategoryMapper.categoryModelToObject(category))
    }

    async findOne(findOneCategoryDto: FindOneCategoryDto): Promise<CategoryEntity> {
        const { id } = findOneCategoryDto;
        try {
            const category = await this.categoryRepository.findOne({
                where: { id }
            });

            if (!category) throw CustomError.badRequest('Category does not exist');

            return CategoryMapper.categoryModelToObject(category);

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async findByIds(categories: Array<number>): Promise<Category[]> {

        try {
            const result = await this.categoryRepository.findBy({
                id: In(categories),
            })

            return result;
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }
    }

    async update(
        findOneCategoryDto: FindOneCategoryDto,
        updateCategoryDto: UpdateCategoryDto
    ): Promise<CategoryEntity> {
        const category = await this.findOne(findOneCategoryDto);
        const updated = await this.categoryRepository.preload({
            id: category.id,
            ...updateCategoryDto
        });

        return CategoryMapper.categoryModelToObject(
            await this.categoryRepository.save(updated!)
        )
    }

    async delete(findOneCategoryDto: FindOneCategoryDto): Promise<CategoryEntity> {

        const category = await this.findOne(findOneCategoryDto);
        const eliminated = await this.categoryRepository.delete(findOneCategoryDto.id)
        return CategoryMapper.categoryModelToObject(eliminated)
    }
}