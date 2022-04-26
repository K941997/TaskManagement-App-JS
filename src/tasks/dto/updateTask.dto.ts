import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsNotEmpty() //Không được rỗng
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  categoryIds: number[];
}
