import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ArticleDto } from './dto';
import { error } from 'console';

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
    async getArticle(articleId) {
        const article = await this.prisma.article.findUnique({
            where: {
                id: parseInt(articleId)
            }
        })
        if (!article) {
            throw error;
        }
        return article;
    }
    async updateArticle(articleId, dto: ArticleDto) {
        try {
            const article = await this.prisma.article.update({
                where: { id: parseInt(articleId) },
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
    async deleteArticle(articleId) {
        try {
            const article = await this.prisma.article.delete({
                where: { id: parseInt(articleId) },
            });
            return article;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // 内容管理相关
    async getPublishedArticles(userId, page, pageSize) {
        const publishedArticles = await this.prisma.article.findMany({
            where: { userId: userId },
            skip: (page - 1) * pageSize,
            take: pageSize,
        })
        return publishedArticles;
    }

    async getNumber(userId, type) {
        if (type == "published") {
            const num = await this.prisma.article.count({
                where: {
                    userId: userId
                }
            })
            return Math.ceil(num / 10);
        }
    }

}
