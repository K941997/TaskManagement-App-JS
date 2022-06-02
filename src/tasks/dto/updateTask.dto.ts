import { IsArray, IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { IsNull } from 'typeorm';
import { IsValidArrayNumber } from '../custom decorators/updateTask.decorator';

export class UpdateTaskDto {
  @IsNotEmpty() //Không được rỗng
  @IsString()
  title: string;

  @IsString()
  // @IsEmpty()
  description: string;

  // @IsArray()
  // @IsArray({})
  @IsValidArrayNumber() //!Custom Decorator (For UpdateTask with Relation)
  categoryIds: number[];
}
