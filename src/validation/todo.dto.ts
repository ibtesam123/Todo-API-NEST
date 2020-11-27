import { IsBoolean, IsOptional, IsString, MinLength } from "class-validator";

export class TodoDTO {
    @IsOptional()
    @IsString()
    @MinLength(4)
    title: string

    @IsOptional()
    @IsString()
    @MinLength(4)
    description: string

    @IsOptional()
    @IsBoolean()
    isComplete: boolean
}