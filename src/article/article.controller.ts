import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
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
    @Post('get')
    getArticle(@GetUser('') user: User, @Body() getArticle) {
        return this.articleService.getArticle(getArticle.articleId)
    }
    @Post('update')
    // 这里发现 body 好像只能接一个参数啊
    updateArticle(@GetUser('') user: User, @Body() updateArticle) {
        return this.articleService.updateArticle(updateArticle.articleId, {
            id: user.id,
            title: updateArticle.dto.title,
            content: updateArticle.dto.content,
        })
    }
    @Post('delete')
    deleteArticle(@GetUser('') user: User, @Body() deleteArticle) {
        return this.articleService.deleteArticle(deleteArticle.articleId)
    }
    @Get('getAllPublished')
    getAllPublishedArticle(@GetUser('') user: User) {
        return this.articleService.getAllPublishedArticles(user.id);
    }

}