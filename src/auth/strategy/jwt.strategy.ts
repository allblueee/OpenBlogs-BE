import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'allblueee-jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  // 通过这里校验 并获取 token 中包含的信息
  // 可以通过 useGuard 获取这些信息 
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
        where:{
            id: payload.sub,
        }
    })
    delete user.hash
    return user;
  }
}
