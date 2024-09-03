import { IsNumberString } from "class-validator";

export class FindOneNoteRequest {
    @IsNumberString()
    readonly id!: number;
}