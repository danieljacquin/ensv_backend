import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { State } from "../../../../enum/stateEnum";
import { CategoryResponse } from "../../../categories/dto/response/category-response";
import { Expose, Type } from "class-transformer";
import { UserResponse } from "../../../users";

export class NoteResponse {

        @Expose()
        @IsNumber()
        @IsOptional()
        readonly id?: number;

        @Expose()
        @IsString()
        @IsNotEmpty()
        readonly title!: string;

        @Expose()
        @IsString()
        @IsNotEmpty()
        readonly content!: string;

        @Expose()
        @IsEnum({type: State})
        @IsNotEmpty()
        readonly state!: State;

        @Expose()
        @IsArray()
        @IsNotEmpty()
        @Type(() => CategoryResponse)
        readonly categories?: Array<CategoryResponse>;

        @Expose()
        @IsNotEmpty()
        @Type(() => UserResponse)
        readonly user!: UserResponse;

        @Expose()
        @IsDate()
        @IsNotEmpty()
        readonly createdAt!: Date;

        @Expose()
        @IsDate()
        @IsNotEmpty()
        readonly updatedAt!: Date;
}