import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { DtoTypeEnum } from "../enum/dtoType.enum";

export function validationMiddleware<T>(
  type: any,
  dtoType: DtoTypeEnum
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const valueByType = {
      [DtoTypeEnum.BODY]: req.body,
      [DtoTypeEnum.PARAMS]: req.params,
      [DtoTypeEnum.QUERY]: req.query,
    };

    const payload = valueByType[dtoType];

    const dto = plainToInstance(type, payload);
    const errors: ValidationError[] = await validate(dto);

    if (errors.length > 0) {
      const messages = errors
        .map((error: ValidationError) => Object.values(error.constraints!))
        .flat();
      res.status(400).json({ messages });
    } else {
      req[dtoType] = dto;
      next();
    }
  };
}
