import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule, CaslModule], //add Casl to Role + isCreator
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
