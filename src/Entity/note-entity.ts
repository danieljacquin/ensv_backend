import { State } from "../enum/stateEnum";
import { Category } from "../model";

class NoteEntity {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public state: State,
        public categories: Array<Category>,
        public updated_at: Date
    ){}
}

export default NoteEntity;