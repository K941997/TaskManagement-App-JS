/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; //!use .env

import { CategoriesModule } from './categories/categories.module';
import { PassportModule } from '@nestjs/passport'; //PassportJS for SignUp SignIn
import { CaslModule } from './casl/casl.module'; //CASL Role isCreator

import { MongooseModule } from '@nestjs/mongoose'; //MongoDB

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot(),

    AuthModule,
    TasksModule,
    CategoriesModule,

    PassportModule.register({ //!Session Cookie PassportJS
      session: true,
    }),

    CaslModule,

    // MongooseModule.forRoot(process.env.CONNECT_MONGODB)

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
