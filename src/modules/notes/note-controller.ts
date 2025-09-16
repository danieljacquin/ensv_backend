import { Request, Response } from "express";

import { errorHandler } from "../../config/error-handler";
import NoteService from "./note-service";


class NoteController {

    constructor(
        private readonly noteService: NoteService
    ) { }

    create = (req: Request, res: Response) => {
        return this.noteService.create(req.body, req.user)
            .then(note => res.json(note))
            .catch(err => errorHandler(err, res));
    }

    getAll = (req: Request, res: Response) => {
        console.log(req.user);
        return this.noteService.getAll(req.user, req.query)
            .then(notes => res.status(200).json(notes))
            .catch(err => errorHandler(err, res));
    }

    findOne = (req: Request, res: Response) => {
        return this.noteService.findOne({id: parseInt(req.params.id)})
            .then(note => res.status(200).json(note))
            .catch(err => errorHandler(err, res));
    }

    update = (req: Request, res: Response) => {
        console.log(req.body);
        this.noteService.update(
            {id: parseInt(req.params.id)},
            req.body
        )
        .then(note => res.status(200).json(note))
        .catch(err => errorHandler(err, res))
    }

    delete = (req: Request, res: Response) => {
        this.noteService.delete({id: parseInt(req.params.id)})
        .then(note => res.status(200).json(note))
        .catch(err => errorHandler(err, res));

    }

    archiveAndUnarchive = (req: Request, res: Response) => {
        this.noteService.archiveAndUnarchive({id: parseInt(req.params.id)})
        .then(note => res.status(200).json(note))
        .catch(err => errorHandler(err, res))
    }
}

export default NoteController;