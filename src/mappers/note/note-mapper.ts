import NoteEntity from "../../Entity/note-entity";
import { CustomError } from "../../error/custom-error";

class NoteMapper {

    static NoteModelToObject(object: { [key: string]: any }) {
        console.log(object);
        const { id, title, content, state, updatedAt, categories } = object;

        //if (!id) throw CustomError.badRequest('missing id');
        if (!title) throw CustomError.badRequest('missing title');
        if (!content) throw CustomError.badRequest('missing content');
        if (!state) throw CustomError.badRequest('state content');
        if (!updatedAt) throw CustomError.badRequest('missing updated_at');
        if (!categories) throw CustomError.badRequest('missing categories');

        return new NoteEntity(
            id,
            title,
            content,
            state,
            categories,
            updatedAt
        );
    }
}

export default NoteMapper;