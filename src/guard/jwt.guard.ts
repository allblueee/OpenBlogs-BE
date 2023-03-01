import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('allblueee-jwt'){
    constructor(){
        super();
    }
}