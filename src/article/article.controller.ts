import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/guard";
import { ArticleService } from "./article.service";
import { ArticleContentDto } from "./dto";

@UseGuards(JwtGuard)
@Controller('article')
export class ArticleController {
    constructor(private articleService: ArticleService) { }
    @Post('create')
    createArticle(@GetUser('') user: User, @Body() dto: ArticleContentDto) {
        return this.articleService.createArticle({
            id: user.id,
            title: dto.title,
            content: dto.content,
        })
    }

}