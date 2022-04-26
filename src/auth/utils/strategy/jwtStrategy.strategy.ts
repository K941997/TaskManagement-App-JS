/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';


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
      // secretOrKey: process.env.SECRETKEYJWTTOKEN, //protect move to .env, secretKey in auth.module
      secretOrKey: 'secretKey', //protect move to .env, secretKey in auth.module
      ignoreExpiration: false //Không lựa chọn bỏ qua Token hết hạn
    });
  }

  async validate(payload: any){ 
    return { id: payload.sub, role: payload.role, isAdmin: payload.isAdmin }; //!payload from jwtToken in auth.service
  }

}
