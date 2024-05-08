import { Validators } from "../../config/validators";

export class FindOneNoteDto {

    private constructor(public id: number) {}

    static create(object: {[key: string]: any}): [string?, FindOneNoteDto?]{

        const { id } = object;
        if(!Validators.stringNumber.test(id)) return ['it must be a number'];

        return [
            undefined,
            new FindOneNoteDto(id)
        ]
    }
}