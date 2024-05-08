import { Validators } from "../../config/validators";

class UpdateNoteDto {
    private constructor(
        public title: string,
        public content: string,
        public categories: Array<number>
    ) { }

    static create(object: { [key: string]: any }): [string?, UpdateNoteDto?] {
        const { title, content, categories } = object;

        if (!title) return ['Title is required'];
        if (Validators.isString.test(title)) return ['Title must be string'];
        if (!content) return ['content is required'];
        if (Validators.isString.test(content)) return ['Content must be string'];
        if (!Array.isArray(categories)) return ['categories must be an array'];
        if (!categories) return ['categories is required'];

        return [
            undefined,
            new UpdateNoteDto(
                title,
                content,
                categories
            )
        ]

    }
}

export default UpdateNoteDto;