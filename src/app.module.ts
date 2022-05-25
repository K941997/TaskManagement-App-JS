/* eslint-disable prettier/prettier */
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
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
import { RedisCacheModule } from './cacheRedis/redis.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),

    TypeOrmModule.forRoot(), //!TypeOrm PostgreSQL Database

    AuthModule,
    TasksModule,
    CategoriesModule,
    // CategoriesMongoDbModule,

    PassportModule.register({ //!Session Cookie PassportJS
      session: true,
    }),

    CaslModule, //!CASL Role isCreator

    // MongooseModule.forRoot(process.env.CONNECT_MONGODB, { //!MongoDB Database
    //   connectionName: 'categories', //connectionName ở categoriesMongo.module
    //   useNewUrlParser: true, //dùng để unique: true ở Schema
    //   useUnifiedTopology: true,
    //   autoIndex: true,
      
    // }),
    //.env CONNECT_MONGODB = mongodb+srv://Kay941997:password@taskmanagement.drrox.mongodb.net/myFirstDatabase?
  
    // MongooseModule.forRoot(process.env.CONNECT_MONGODB, {
    //   connectionName: 'tasks', //connectionName ở tasksMongo.module
    //   useNewUrlParser: true, //dùng để unique: true ở Schema
    //   useUnifiedTopology: true,
    //   autoIndex: true,
      
    // }), UserTypesModule //!MongoDB Database
    //.env CONNECT_MONGODB = mongodb+srv://Kay941997:password@taskmanagement.drrox.mongodb.net/myFirstDatabase?
    
  
    // RedisCacheModule, //!Cache Redis: (+ Docker)
    // CacheModule.register({ //!Cache Global
    //   // ttl: 60, //thời gian hết hạn của bộ nhớ Cache
    //   // max: 100, //maximum number of items in Cache
    //   isGlobal: true,
    // }),

    ScheduleModule.forRoot(),
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
