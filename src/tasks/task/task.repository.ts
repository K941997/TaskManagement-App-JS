/* eslint-disable prettier/prettier */
import { TaskEntity } from './task.entity'
import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {    
}
