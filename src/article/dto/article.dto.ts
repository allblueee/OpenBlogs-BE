import { IsInt, IsString } from "class-validator";

export class ArticleDto {
    @IsInt()
    id: number;

    @IsString()
    title: string;

    @IsString()
    content: string;
}

export class ArticleContentDto {
    @IsString()
    title: string;

    @IsString()
    content: string;
}
