import { FindManyOptions } from "typeorm";

import { CategoryService } from "../categories/category-service";
import { dataSource } from "../../config";
import { Note } from "./note-entity";
import { CustomError } from "../../error/custom-error";
import { State } from "../../enum/stateEnum";
import { plainToInstance } from "class-transformer";
import {
  CreateNoteRequest,
  FindOneNoteRequest,
  UpdateNoteRequest,
} from "./dto/request";
import { NoteResponse } from "./dto/response/note-response";
import UserService from "../users/user-service";

interface CustomResponse {
  notes: NoteResponse[];
  pagination: {
    current_page: number;
    total: number;
    page_size: number;
  };
}

class NoteService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly userService: UserService
  ) {}

  public noteRepository = dataSource.getRepository(Note);

  async create(createNoteDto: CreateNoteRequest): Promise<NoteResponse> {
    const { title, content, categories, userId } = createNoteDto;

    const user = await this.userService.findOne({id: userId})
    const existedCategories = await this.categoryService.findByIds(categories);

    const note = await this.noteRepository.save({
      title,
      content,
      categories: existedCategories,
      user
    });

    return plainToInstance(NoteResponse, note, {
      excludeExtraneousValues: true,
    });
  }

  async getAll(object: any): Promise<CustomResponse> {
    const { page = 1, perPage = 5, state } = object;

    let findOptions: FindManyOptions<Note> = {
      relations: {
        categories: true,
        user: true
      },
      skip: Math.max(0, (page - 1) * perPage),
      take: perPage,
    };

    if (state) {
      findOptions.where = {
        state,
      };
    }

    const [data, totalNotes] = await this.noteRepository.findAndCount(
      findOptions
    );

    return {
      notes: data.map((note) =>
        plainToInstance(NoteResponse, note, {
          excludeExtraneousValues: true,
        })
      ),
      pagination: {
        current_page: page,
        total: totalNotes,
        page_size: perPage,
      },
    };
  }

  async findOne(findOneNoteDto: FindOneNoteRequest): Promise<Note> {
    const { id } = findOneNoteDto;

    try {
      const note = await this.noteRepository.findOne({
        relations: {
          categories: true,
        },
        where: {
          id,
        },
      });

      if (!note) throw CustomError.badRequest("note does not exist");

      return note;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async update(
    findOneNoteDto: FindOneNoteRequest,
    updateCategoryDto: UpdateNoteRequest
  ): Promise<any> {
    const { categories, title, content, userId } = updateCategoryDto;
    const note = await this.findOne(findOneNoteDto);
    const user = await this.findOne({id: userId});
    let dbcategories = await this.categoryService.findByIds(categories);

    const updated = await this.noteRepository.preload({
      id: note.id,
      title: title,
      content: content,
      categories: dbcategories,
      user
    });

    return plainToInstance(NoteResponse, await this.noteRepository.save(updated!), {
      excludeExtraneousValues: true,
    });
  }

  async delete(findOneNoteRequest: FindOneNoteRequest): Promise<NoteResponse> {
        const note = await this.findOne(findOneNoteRequest);
        const deleted = await this.noteRepository.remove(note)
        return plainToInstance(NoteResponse, deleted, {
          excludeExtraneousValues: true,
        });
    }

    async archiveAndUnarchive(findOneNoteRequest: FindOneNoteRequest): Promise<NoteResponse> {
        const note = await this.findOne(findOneNoteRequest);

        const updated = await this.noteRepository.preload({
            id: note.id,
            title: note.title,
            content: note.content,
            state: note.state === State.ACTIVE ? State.UNACTIVE : State.ACTIVE,
            categories: note.categories,
            user: note.user
        })

        return plainToInstance(NoteResponse, await this.noteRepository.save(updated!), {
          excludeExtraneousValues: true,
        });
    }
}

export default NoteService;
