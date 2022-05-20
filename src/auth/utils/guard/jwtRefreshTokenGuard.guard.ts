/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

//!JwtAuthGuard:
@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh') { 
    
    
}