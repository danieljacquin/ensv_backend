export class UpdateCategoryDto{

    private constructor(public name: string){}

    static create(object: {[key: string]: any}): [string?, UpdateCategoryDto?]{

        const { name } = object;

        if(!name) return ['name is required']

        return [
            undefined,
            new UpdateCategoryDto(name)
        ]
    }

}