export class CreateCategoryDto{

    private constructor(public name: string){}

    static create(object: {[key: string]: any}): [string?, CreateCategoryDto?]{

        const { name } = object;

        if(!name) return ['name is required']

        return [
            undefined,
            new CreateCategoryDto(name)
        ]
    }
}