import { Validators } from "../../config/validators";

export class FindOneCategoryDto {

    private constructor(public id: number) {}

    static create(object: {[key: string]: any}): [string?, FindOneCategoryDto?]{

        const { id } = object;
        if(!Validators.stringNumber.test(id)) return ['it must be a number'];

        return [
            undefined,
            new FindOneCategoryDto(id)
        ]
    }
}