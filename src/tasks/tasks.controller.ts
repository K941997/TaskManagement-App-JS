/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksSearchFilterDto } from './dto/getTasksSearchFilter.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskStatusValidationPipe } from './custom pipes/taskStatusValidation.pipe';
import { TaskEntity } from './entity/task.entity';
import { TasksService } from './tasks.service';
import { TaskStatus } from './taskStatus.enum';
import { UserEntity } from 'src/auth/entity/user.entity';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';
import { CategoriesService } from 'src/categories/categories.service';
import { JwtAuthGuard } from 'src/auth/utils/guard/jwtAuthGuard.guard';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/role/role.enum';
import { RolesGuard } from 'src/auth/role/roleGuard.guard';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/casl/casl-action.enum';
import { ForbiddenError } from '@casl/ability';
import { PoliciesGuard } from 'src/casl/policiesGuard.guard';
import { CheckPolicies } from 'src/casl/casl-ability.decorator';
@Controller('tasks') //localhost:3000/api/tasks/

export class TasksController {
  constructor(
    private tasksService: TasksService,
    private caslAbilityFactory: CaslAbilityFactory //add Casl to Role + isCreator
  ) {}

  //!Create A Task:
  @Post()
  //todo: Role Admin Premium thay bằng CASL isAdmin Role + isCreator:
  // @Roles(Role.ADMIN, Role.PREMIUM)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: RequestWithUser, //!(Req after LogIn) use in createTask
  ): Promise<TaskEntity> {
    console.log(req.user) //{ id: 1, role: "admin", ... } phục thuộc JWTStrategy + AuthService

    return this.tasksService.createTask(createTaskDto, req.user);

  }

  //!Get All Tasks + Get All Tasks Search Filter:
  @Get() //Nếu thêm query thì sẽ hiện Tasks theo query hoặc không thêm query thì hiện tất cả:
  getTasksSearchFilter(
    @Query(ValidationPipe) filterDto: GetTasksSearchFilterDto,
  ): Promise<TaskEntity[]> {
    return this.tasksService.getTasksSearchFilter(filterDto);
  }

  //!Get Task By Id:
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<TaskEntity> {
    return this.tasksService.getTaskById(id);
  }

  // //!Update Task Status:
  // @UseGuards(JwtAuthGuard)
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Promise<TaskEntity> {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  // //!Update Task Normal CASL Role:
  // @Put('/:id')
  // @UseGuards(JwtAuthGuard)
  // @UsePipes(ValidationPipe)
  // async updateTask(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateTaskDto: UpdateTaskDto,
  //   @Req() req: RequestWithUser, //!(Req after LogIn) use in CASL
  // ): Promise<TaskEntity> {
  //   //todo: CASL to Role + isCreator:
  //   //todo: CASL to Service:
  //   const user = req.user

  //   try {
  //     return this.tasksService.updateTask(id, updateTaskDto, user);
  //   } catch (error) {
  //     if (error instanceof ForbiddenError) {
  //       throw new ForbiddenException(error.message);
  //     }
  //   }
  // }

  //!Update Task Advanced CASL Role:
  @Put('/:id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, TaskEntity))
  @UsePipes(ValidationPipe)
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: RequestWithUser, //!(Req after LogIn) use in CASL
  ): Promise<TaskEntity> {
    //todo: CASL to Role + isCreator:
    //todo: CASL to Service:
    const user = req.user

    return this.tasksService.updateTask(id, updateTaskDto, user);
  }

  // //!Delete Task Normal CASL Role isAdmin isCreator:
  // @UseGuards(JwtAuthGuard)
  // @Delete('/:id')
  // async deleteTask(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Req() req: RequestWithUser, //!(Req after LogIn) use in CASL
  // ): Promise<void> {
  //   //todo: CASL Normal:
  //   //todo: CASL cho vào Service:
  //   const user = req.user

  //   try {    
  //       return this.tasksService.deleteTask(id, user);
  //     } catch (error) {
  //       if (error instanceof ForbiddenError) {
  //         throw new ForbiddenException(error.message);
  //       }
  //   }
  // }

  //!Delete Task Advanced CASL Role isAdmin isCreator:
  @Delete('/:id')
  //todo: CASL Advanced:
  //todo: CASL cho vào Service:
  @UseGuards(JwtAuthGuard, PoliciesGuard) //!JwtAuthGuard + CASL
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, TaskEntity))
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser, //!(Req after LogIn) use in CASL
  ): Promise<void> {
    const user = req.user

    return this.tasksService.deleteTask(id,user);
  }



}
