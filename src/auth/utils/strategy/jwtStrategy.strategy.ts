/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
dotenv.config()


//!JWTStrategy: (for CRUD after Login)
//Todo: JwtStrategy to JwtAuthGuard:
//Todo: Bearer Token (for Protected after Login):
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
  constructor(
    @InjectRepository(UserRepository) //!@InjectRepository: đưa UserRepository vào Service
    private userRepository: UserRepository, //!private: vừa khai báo vừa injected vừa khởi tạo
  ) {
    super({
      //!JWTToken BearerToken:
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY_JWT_TOKEN, //protect move to .env, secretKey in auth.module //!Thiếu dotenv.config()
      ignoreExpiration: false //Không lựa chọn bỏ qua Token hết hạn
    });
  }

  async validate(payload: any){ //todo: payload from jwttoken login in auth.Service
    const user = await this.userRepository.find({id: payload.sub});

    return user;
    // return { user, id: payload.sub, role: payload.role, isAdmin: payload.isAdmin };
  }

}
