/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express'
import { AuthService } from "src/auth/auth.service";

//!Refresh Token: 
//!JwtRefreshTokenStrategy: (for Refresh)
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') { 
  constructor(
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Refresh;
      }]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET, 
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload){ 
    const refreshToken = request.cookies?.Refresh;

    return this.authService.getUserIfRefreshTokenMatches(refreshToken, payload.userId)
  }

}
