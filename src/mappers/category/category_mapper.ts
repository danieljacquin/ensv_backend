import { CategoryEntity } from "../../Entity/category-entity";
import { CustomError } from "../../error/custom-error";
import { Category } from "../../model";

class CategoryMapper {

    static categoryModelToObject(object: {[key: string]: any}) {
        const { id, name } = object;

        if(!id) throw CustomError.badRequest('missing id');
        if(!name) throw CustomError.badRequest('missing name');

        return new CategoryEntity(
            id, name
        );
    }
}

export default CategoryMapper