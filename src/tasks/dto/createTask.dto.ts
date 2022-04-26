/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, IsNumber, IsString, MaxLength, ValidateIf } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateTaskDto {
  @IsNotEmpty() //Không được rỗng
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  categoryIds: number[];
}
