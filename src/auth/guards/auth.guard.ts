import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ExtendedRequest } from "./request.types";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req:ExtendedRequest = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);

        if(!token) throw new UnauthorizedException("Invalid Token");

        try {
            const payload = this.jwtService.verify(token);
            req.userId = payload.userId
        } catch (error) {
            Logger.error(error.message);
            throw new UnauthorizedException("Invalid token!");
        }
        return true;
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        return req.headers.authorization;
    }
}