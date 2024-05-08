import { FindManyOptions } from "typeorm";
import { CategoryEntity } from "../Entity/category-entity";
import NoteEntity from "../Entity/note-entity";
import { dataSource } from "../config";
import CreateNoteDto from "../dto/note/create-note.dto";
import { FindOneNoteDto } from "../dto/note/find-one-note.dto";
import UpdateNoteDto from "../dto/note/update-note.dto";
import { State } from "../enum/stateEnum";
import { CustomError } from "../error/custom-error";
import NoteMapper from "../mappers/note/note-mapper";
import { Note } from "../model";
import { CategoryService } from "./category-service";

interface CustomResponse {
    notes: NoteEntity[];
    pagination: {
        current_page: number;
        total: number;
        page_size: number;
    }
}

class NoteService {

    constructor(
        private readonly categoryService: CategoryService
    ) { }

    public noteRepository = dataSource.getRepository(Note);

    async create(createNoteDto: CreateNoteDto): Promise<NoteEntity> {

        const { title, content, categories } = createNoteDto;

        const existedCategories = await this.categoryService.findByIds(categories)

        const note = await this.noteRepository.save({
            title,
            content,
            categories: existedCategories
        })

        return NoteMapper.NoteModelToObject(note)
    }

    async getAll(object: any): Promise<CustomResponse> {
        const { page = 1, pageSize = 5, state } = object;

        let findOptions: FindManyOptions<Note> = {
            relations: {
                categories: true
            },
            skip: Math.max(0, (page - 1) * pageSize),
            take: pageSize,
        };

        if (state) {
            findOptions.where = {
                state
            }
        }


        const [data, totalNotes] = await this.noteRepository.findAndCount(findOptions);



        return {
            notes: data.map(note => NoteMapper.NoteModelToObject(note)),
            pagination: {
                current_page: page,
                total: totalNotes,
                page_size: pageSize
            }
        }
    }

    async findOne(findOneNoteDto: FindOneNoteDto): Promise<Note> {
        const { id } = findOneNoteDto;

        try {
            const note = await this.noteRepository.findOne({
                relations: {
                    categories: true
                },
                where: {
                    id
                }
            });

            if (!note) throw CustomError.badRequest('note does not exist');

            return note;

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServer();
        }

    }

    async update(
        findOneNoteDto: FindOneNoteDto,
        updateCategoryDto: UpdateNoteDto
    ): Promise<NoteEntity> {

        const { categories, title, content } = updateCategoryDto;
        const note = await this.findOne(findOneNoteDto);
        let clientNoteCategories = await this.categoryService.findByIds(categories);

        let dbNoteCategories = note.categories?.filter(category => categories.includes(category.id));

        if (dbNoteCategories === undefined) {
            dbNoteCategories = []
        }

        const combinedArray = dbNoteCategories.concat(clientNoteCategories);
        const uniqueArray: CategoryEntity[] = [];

        combinedArray.forEach(obj => {
            // Check if the object already exists in the unique array based on its properties
            if (!uniqueArray.some((item: { id: number; }) => item.id === obj.id)) {
                uniqueArray.push(obj);
            }
        });

        const updated = await this.noteRepository.preload({
            id: note.id,
            title: title,
            content: content,
            categories: uniqueArray
        });

        return NoteMapper.NoteModelToObject(
            await this.noteRepository.save(updated!)
        );

    }

    async delete(findOneNoteDto: FindOneNoteDto): Promise<NoteEntity> {
        const note = await this.findOne(findOneNoteDto);
        const deleted = await this.noteRepository.remove(note)
        return NoteMapper.NoteModelToObject(deleted);
    }

    async archiveAadUnarchive(findOneNoteDto: FindOneNoteDto): Promise<NoteEntity> {

        const note = await this.findOne(findOneNoteDto);

        const updated = await this.noteRepository.preload({
            id: note.id,
            title: note.title,
            content: note.content,
            state: note.state === State.ACTIVE ? State.UNACTIVE : State.ACTIVE,
            categories: note.categories
        })

        return NoteMapper.NoteModelToObject(await this.noteRepository.save(updated!))
    }


}

export default NoteService;