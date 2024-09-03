import { In } from "typeorm";

import { dataSource } from "../../config";
import { Category } from "./category-entity";
import { CustomError } from "../../error/custom-error";
import { plainToInstance } from "class-transformer";
import { CreateCategoryRequest, FindOneCategoryRequest, UpdateCategoryRequest } from "./dto/request";
import { CategoryResponse } from "./dto/response/category-response";



export class CategoryService {
  public categoryRepository = dataSource.getRepository(Category);

  async create(
    createCategoryInputDto: CreateCategoryRequest
  ): Promise<CategoryResponse> {
    const { name } = createCategoryInputDto;
    try {
      const exists = await this.categoryRepository.findOne({
        where: {
          name,
        },
      });

      if (exists) throw CustomError.badRequest("Category already exists");

      const category = await this.categoryRepository.save({ name });

      return plainToInstance(CategoryResponse, category, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async getAll(): Promise<CategoryResponse[]> {
    const data = await this.categoryRepository.find();
    return data.map((category) =>
      plainToInstance(CategoryResponse, category, {
        excludeExtraneousValues: true,
      })
    );
  }

  async findOne(
    findOneCategoryInputDto: FindOneCategoryRequest
  ): Promise<CategoryResponse> {
    const { id } = findOneCategoryInputDto;
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });

      if (!category) throw CustomError.badRequest("Category does not exist");

      return plainToInstance(CategoryResponse, category, {
        excludeExtraneousValues: true,
      });
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
      });

      return result;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async update(
    findOneCategoryInputDto: FindOneCategoryRequest,
    updateCategoryInputDto: UpdateCategoryRequest
  ): Promise<CategoryResponse> {
    const category = await this.findOne(findOneCategoryInputDto);
    const updated = await this.categoryRepository.preload({
      id: category.id,
      ...updateCategoryInputDto,
    });

    return plainToInstance(
      CategoryResponse,
      await this.categoryRepository.save(updated!),
      {
        excludeExtraneousValues: true,
      }
    );
  }

  async delete(
    findOneCategoryInputDto: FindOneCategoryRequest
  ): Promise<CategoryResponse> {
    const category = await this.findOne(findOneCategoryInputDto);
    //turn into from dto to class entity
    const categoryEntity = plainToInstance(Category, category);
    const eliminated = await this.categoryRepository.remove(categoryEntity);
    return plainToInstance(CategoryResponse, eliminated, {
      excludeExtraneousValues: true,
    });
  }
}
