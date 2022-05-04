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
import { CategoriesMongoDbModule } from './categories-mongo-db/categories-mongo-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot(), //!TypeOrm PostgreSQL Database

    AuthModule,
    TasksModule,
    CategoriesModule,
    CategoriesMongoDbModule,

    PassportModule.register({ //!Session Cookie PassportJS
      session: true,
    }),

    CaslModule, //!CASL Role isCreator

    MongooseModule.forRoot(process.env.CONNECT_MONGODB, {
      connectionName: 'categories', //connectionName ở categoriesMongo.module
      useNewUrlParser: true, //dùng để unique: true ở Schema
      useUnifiedTopology: true,
      autoIndex: true,
      
    }), //!MongoDB Database
    //.env CONNECT_MONGODB = mongodb+srv://Kay941997:password@taskmanagement.drrox.mongodb.net/myFirstDatabase?
  
    MongooseModule.forRoot(process.env.CONNECT_MONGODB, {
      connectionName: 'tasks', //connectionName ở tasksMongo.module
      useNewUrlParser: true, //dùng để unique: true ở Schema
      useUnifiedTopology: true,
      autoIndex: true,
      
    }) //!MongoDB Database
    //.env CONNECT_MONGODB = mongodb+srv://Kay941997:password@taskmanagement.drrox.mongodb.net/myFirstDatabase?
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
