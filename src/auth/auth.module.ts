/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SessionCookieSerializer } from './utils/serializer/sessionCookieSerializer';
import { JwtStrategy } from './utils/strategy/jwtStrategy.strategy';
import { UserEntity } from './entity/user.entity';
import { LocalStrategy } from './utils/strategy/localStrategy.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './utils/guard/jwtAuthGuard.guard';
import { RolesGuard } from './role/roleGuard.guard';
import { CaslModule } from 'src/casl/casl.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config()

// const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });


@Module({
  imports: [
    PassportModule,

    PassportModule.register({ //!Remove SessionCookie to Use Guard JWTToken return access_token = BearerToken check SessionCookie:
      defaultStrategy: 'jwt',
      // session: true,
    }), 

    JwtModule.register({ //!JWTModule register to use Guard JWTToken return access_token = BearerToken check SessionCookie
      secret: process.env.SECRET_KEY_JWT_TOKEN, //protect move to .env, fill in jwtStrategy //!Thiếu dotenv.config()
      signOptions: {
        expiresIn: '3600s',
      },
    }),

    TypeOrmModule.forFeature([UserRepository]),

    CaslModule,
   
  ],

  // providers: [AuthService, JwtStrategy, LocalStrategy, SessionCookieSerializer], //!Session Cookie
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, RolesGuard], //!..., JwtAuthGuard to TaskController, JwtStrategy Remove SessionCookie to use Guard JWTToken return access_token = BearerToken check SessionCookie

  controllers: [AuthController],

  exports: [AuthService, PassportModule], //JwtStrategy Guards


})
export class AuthModule {}
