import { Validators } from "../../config/validators";

export class PaginationOptionsDto {

    private constructor(
        public page: number,
        public perPage: number,
    ) { }

    static create(object: { [key: string]: any }): [string?, PaginationOptionsDto?] {

        const { page, perPage } = object;
        if (!(page != null)) {
            if (!Validators.stringNumber.test(page)) return ['page must be a number'];
        }
        if (!(perPage != null)) {
            if (!Validators.stringNumber.test(perPage)) return ['perPage must be a number'];
        }


        return [
            undefined,
            new PaginationOptionsDto(page, perPage)
        ]
    }
}