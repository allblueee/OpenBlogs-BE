import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ArticleDto } from './dto';

@Injectable()
export class ArticleService {
    constructor(
        private prisma: PrismaService,
    ) { }
    async createArticle(dto: ArticleDto) {
        try {
            const article = await this.prisma.article.create({
                data: {
                    userId: dto.id,
                    title: dto.title,
                    content: dto.content
                },
            });
            return article;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
