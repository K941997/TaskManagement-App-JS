/* eslint-disable prettier/prettier */
import { TaskToCategoryEntity } from 'src/tasks/entity/taskToCategory.entity';
import { TaskEntity } from 'src/tasks/entity/task.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['name']) //Không trùng lặp name
export class CategoryEntity {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  //!ManyToMany: (Không dùng)
  // @ManyToMany(() => TaskEntity, (task: TaskEntity) => task.categories)
  // public tasks: TaskEntity[];
  //!Custom ManyToMany: (Dùng)
  @OneToMany(() => TaskToCategoryEntity, taskToCategory => taskToCategory.category, {nullable: true})
  //!Không onDelete: "CASCADE" thì Xóa Relation TaskToCategory Không Xóa luôn Category
  public taskToCategory: TaskToCategoryEntity[];
}
