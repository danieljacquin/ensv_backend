import { Request, Response } from "express";
import { errorHandler } from "../../config/error-handler";
import { CategoryService } from "./category-service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  create = (req: Request, res: Response) => {
    this.categoryService
      .create(req.body!)
      .then((category) => res.json(category))
      .catch((err) => errorHandler(err, res));
  };

  getAll = (req: Request, res: Response) => {
    this.categoryService
      .getAll()
      .then((categories) => res.status(200).json(categories))
      .catch((err) => errorHandler(err, res));
  };

  findOne = (req: Request, res: Response) => {
    this.categoryService
      .findOne({ id: parseInt(req.params.id) })
      .then((category) => res.status(200).json(category))
      .catch((err) => errorHandler(err, res));
  };

  update = (req: Request, res: Response) => {
    this.categoryService
      .update({ id: parseInt(req.params.id) }, req.body)
      .then((category) => res.json(category))
      .catch((e) => errorHandler(e, res));
  };

  delete = (req: Request, res: Response) => {
    this.categoryService
      .delete({ id: parseInt(req.params.id) })
      .then((category) => res.json(category))
      .catch((err) => errorHandler(err, res));
  };
}
