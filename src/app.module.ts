/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import ormconfig from './ormconfig';
// import {typeOrmConfig} from './config/typeorm.config';
// import ormconfig from './config/orm.config';
// import ormconfig from './ormconfig';

import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; //!use .env

// import { CategoriesController } from './categories/categories.controller';
// import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { PassportModule } from '@nestjs/passport';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot(),
    TasksModule,
    AuthModule,
    CategoriesModule,

    PassportModule.register({ //!Session Cookie PassportJS
      session: true,
    }),

    CaslModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
