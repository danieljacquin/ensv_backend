import { Request, Response } from "express";
import { CreateCategoryDto } from "../dto/category/create-category.dto";
import { CategoryService } from "../service/category-service";
import { FindOneCategoryDto } from "../dto/category/find-one-category.dto";
import { UpdateCategoryDto } from "../dto/category/update-category.dto";
import { errorHandler } from "../config/error-handler";

export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService
    ) { }


    create = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if (error) return res.status(400).json({ error });

        this.categoryService.create(createCategoryDto!)
            .then(category => res.json(category))
            .catch(err => errorHandler(err, res))
    }

    getAll = (req: Request, res: Response) => {
        this.categoryService.getAll()
            .then(categories => res.status(200).json(categories))
            .catch(err => errorHandler(err, res))
    }

    findOne = (req: Request, res: Response) => {
        const [error, findOneCategoryDto] = FindOneCategoryDto.create(req.params);

        if (error) return res.status(400).json({ error: error });

        this.categoryService.findOne(findOneCategoryDto!)
            .then(category => res.status(200).json(category))
            .catch(err => errorHandler(err, res))
    }

    update = (req: Request, res: Response) => {

        const [error, findOneCategoryDto] = FindOneCategoryDto.create(req.params);
        const [err, updateCategoryDto] = UpdateCategoryDto.create(req.body);

        if (error) return res.status(400).json({ error });
        if (err) return res.status(400).json({ error: err });

        this.categoryService.update(findOneCategoryDto!, updateCategoryDto!)
            .then(category => res.json(category))
            .catch(e => errorHandler(e, res))
    }

    delete = (req: Request, res: Response) => {

        const [error, findOneCategoryDto] = FindOneCategoryDto.create(req.params);

        if (error) return res.status(400).json({ error: error });

        this.categoryService.delete(findOneCategoryDto!)
            .then(category => res.json(category))
            .catch(err => errorHandler(err, res))

    }

}