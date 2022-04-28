/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config()


//!JWTStrategy:
//Todo: JwtStrategy to JwtAuthGuard:
//Todo: Bearer Token (for Protected after Login):
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
  constructor(
  ) {
    super({
      //!JWTToken BearerToken:
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_JWT_TOKEN, //protect move to .env, secretKey in auth.module //!Thiếu dotenv.config()
      ignoreExpiration: false //Không lựa chọn bỏ qua Token hết hạn
    });
  }

  async validate(payload: any){ 
    return { id: payload.sub, role: payload.role, isAdmin: payload.isAdmin }; //!payload from jwtToken in auth.service
  }

}
