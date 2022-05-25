/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false, //!Logger: (Ghi nhật ký)
  });

  app.use(cookieParser()); //!Cookie: (for Refresh Token request?.cookies?.Refresh)
   
  //!Thêm hậu tố api -> localhost:3000/api/
  app.setGlobalPrefix('api');

  //!Remove SessionCookie to Use Guard JWTToken return access_token = BearerToken check SessionCookie:
  // app.use(
  //   // cookieParser(),
  //   session({
  //     secret: "key session", //Bí mật Cho vào .env .gitignore
  //     resave: false,
  //     saveUninitialized: false, //Thay đổi session liên tục mỗi khi vào web
  //     cookie: {
  //       maxAge: 3600000,
  //     },
  //   }),
  // )
  // app.use(passport.initialize());
  // app.use(passport.session());

  //!Global ValidationPipe DTO:
  //Nếu ko để Global ValidationPipe thì trong Controller phải có ValidationPipe mới dùng được DTO
  //Nếu để Global ValidationPipe thì bắt buộc phải tạo DTO class-validator @IsNotEmpty
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  

  await app.listen(3000);
}
bootstrap();
