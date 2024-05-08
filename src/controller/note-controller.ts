import { Request, Response } from "express";

import CreateNoteDto from "../dto/note/create-note.dto";
import NoteService from "../service/note-service";
import { errorHandler } from "../config/error-handler";
import { FindOneNoteDto } from "../dto/note/find-one-note.dto";
import UpdateNoteDto from "../dto/note/update-note.dto";
import { PaginationOptionsDto } from "../dto/note/pagination-options.dto";


class NoteController {

    constructor(
        private readonly noteService: NoteService
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createNoteDto] = CreateNoteDto.create(req.body);

        if (error) return res.status(400).json({ error });

        return this.noteService.create(createNoteDto!)
            .then(note => res.json(note))
            .catch(err => errorHandler(err, res));
    }

    getAll = (req: Request, res: Response) => {

        //const [error, paginationOptionsDto] = PaginationOptionsDto.create(req.query);

        //if (error) return res.status(400).json({ error });

        return this.noteService.getAll(req.query)
            .then(notes => res.status(200).json(notes))
            .catch(err => errorHandler(err, res));
    }

    findOne = (req: Request, res: Response) => {
        const [error, findOneNoteDto] = FindOneNoteDto.create(req.params);

        if (error) return res.status(400).json({ error });

        return this.noteService.findOne(findOneNoteDto!)
            .then(note => res.status(200).json(note))
            .catch(err => errorHandler(err, res));
    }

    update = (req: Request, res: Response) => {
        const [error, findOneNoteDto] = FindOneNoteDto.create(req.params);
        const [err, updateNoteDto] = UpdateNoteDto.create(req.body);

        if (error) return res.status(400).json({ error });
        if (err) return res.status(400).json({ error: err });

        this.noteService.update(
            findOneNoteDto!,
            updateNoteDto!
        )
        .then(note => res.status(200).json(note))
        .catch(err => errorHandler(err, res))
    }

    delete = (req: Request, res: Response) => {
        const [error, findOneNoteDto] = FindOneNoteDto.create(req.params);

        if(error) return res.status(400).json({error});

        this.noteService.delete(findOneNoteDto!)
        .then(note => res.status(200).json(note))
        .catch(err => errorHandler(err, res));

    }

    archiveAndUnarchive = (req: Request, res: Response) => {
        const [error, findOneNoteDto] = FindOneNoteDto.create(req.params);

        if(error) return res.status(400).json({error});

        this.noteService.archiveAadUnarchive(findOneNoteDto!)
        .then(note => res.status(200).json(note))
        .catch(err => errorHandler(err, res))
    }
}

export default NoteController;