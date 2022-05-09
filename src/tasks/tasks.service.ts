/* eslint-disable prettier/prettier */
import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
// import { v4 as uuid } from 'uuid'; //tạo id ngẫu nhiên
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksSearchFilterDto } from './dto/getTasksSearchFilter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { TaskStatus } from './taskStatus.enum';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { getRepository, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from 'src/auth/entity/user.entity';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { ForbiddenError } from '@casl/ability';
import { Action } from 'src/casl/casl-action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { TaskToCategoryEntity } from './entity/taskToCategory.entity';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,

    private caslAbilityFactory: CaslAbilityFactory, //CASL Role

  ) {}

 
  //!Create A Task + Relation Database (author + categories):
  async createTask(createTaskDto: CreateTaskDto, author: UserEntity): Promise<TaskEntity> {

    const { title, description, categoryIds } = createTaskDto;

    // const taskNew = new TaskEntity();
    // taskNew.title = title;
    // taskNew.description = description;
    // taskNew.status = TaskStatus.OPEN;
    // taskNew.author = author;
    // taskNew.taskToCategory = [] ; //!ManyToMany Advanced Relation Xem lai

    const taskNew = this.taskRepository.create(
      createTaskDto
    )

    taskNew.author = author
    taskNew.taskToCategories = [];

    const newTask = await taskNew.save();
    console.log(newTask);
    
    for (let i = 0; i < categoryIds.length; i++) {
      const category = await getRepository(CategoryEntity).findOne(categoryIds[i]);
      console.log(category)

      if (category) {
        const newTaskToCategory = new TaskToCategoryEntity();
        newTaskToCategory.taskId = newTask.id
        newTaskToCategory.categoryId = category.id
        console.log(newTaskToCategory)

        taskNew.taskToCategories.push(newTaskToCategory);
      } else {
        throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
      }
    }

    await taskNew.save()
    return taskNew;
  }

  //!Get All Tasks + Get All Tasks Search Filter:
  async getTasksSearchFilter(filterDto: GetTasksSearchFilterDto): Promise<TaskEntity[]> {
    const { status, search } = filterDto;
    const query = this.taskRepository
      .createQueryBuilder('task') //!TypeOrm Query Builder
      .orderBy("task.id")
      .leftJoinAndSelect('task.taskToCategories', 'category');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }


  //!Get Task By Id:
  async getTaskById(id: number): Promise<TaskEntity> {
    const taskFound = await this.taskRepository.findOne(id, {relations: ['author', 'taskToCategories']});

    if (!taskFound) { //Error Handle:
      throw new NotFoundException(`Task with ID ${id} not found !`);
    } else {
      return taskFound;
    }
   
  }

  // //!Update Task Status:
  // async updateTaskStatus(id: number, status: TaskStatus): Promise<TaskEntity> {
  //   const task = await this.getTaskById(id);
  //   task.status = status;
  //   await task.save();
  //   return task;
  // }

  //!Update Task use CASL Role:
  async updateTask (id: number, updateTaskDto: UpdateTaskDto, user:UserEntity) : Promise<TaskEntity> {

    //todo: CASL isAdmin isCreator:
    const caslAbility = this.caslAbilityFactory.createForUser(user)
    const taskToUpdate = await this.getTaskById(id);
      ForbiddenError.from(caslAbility)
        .setMessage('only admin or creator!')
        .throwUnlessCan(Action.Update, taskToUpdate);

    const updatedTask = await this.taskRepository.findOne(id, {relations: ['author']})

    const { title, description, categoryIds } = updateTaskDto;

    updatedTask.title = title;
    updatedTask.description = description;

    updatedTask.taskToCategories = [] ; //!ManyToMany Relation Xem lai
    for (let i = 0; i < categoryIds.length; i++) {
      const category = await getRepository(CategoryEntity).findOne(categoryIds[i]);
      console.log(category)

      if (category) {
        const updateTaskToCategory = new TaskToCategoryEntity();
        updateTaskToCategory.taskId = updatedTask.id
        updateTaskToCategory.categoryId = category.id

        updatedTask.taskToCategories.push(updateTaskToCategory);
      } else {
        throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
      }
    }

    await updatedTask.save();
    return updatedTask;
  }

  //!Delete Task use CASL Role:
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) { //Error Handle:
      throw new NotFoundException(`Task with ID ${id} is not found !`);
    }
  }
}
