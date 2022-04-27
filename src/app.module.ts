/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; //!.env

import { CategoriesModule } from './categories/categories.module';
import { PassportModule } from '@nestjs/passport'; //PassportJS for SignUp SignIn
import { CaslModule } from './casl/casl.module'; //CASL Role isCreator

import { MongooseModule } from '@nestjs/mongoose'; //MongoDB

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot(), //!TypeOrm PostgreSQL Database

    AuthModule,
    TasksModule,
    CategoriesModule,

    PassportModule.register({ //!Session Cookie PassportJS
      session: true,
    }),

    CaslModule, //!CASL Role isCreator

    MongooseModule.forRoot(process.env.CONNECT_MONGODB) //!MongoDB Database

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
