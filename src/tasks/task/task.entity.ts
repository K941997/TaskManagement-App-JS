/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/user/user.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskToCategoryEntity } from '../task-to-category/taskToCategory.entity';
import { TaskStatus } from '../taskStatus.enum';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({nullable: true})
  status: TaskStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({nullable: true}) //!CASL Role + isCreator thay cho role
  isPublished: boolean;

  @Column() //!CASL Role + isCreator thay cho role
  authorId: number;

  @ManyToOne(() => UserEntity, (author: UserEntity) => author.tasks, { eager: false, onDelete: "CASCADE"}) 
  //eager: false (Không load author)
  //!onDelete: "CASCADE" Xóa User Xóa luôn Task
  //onDelete: "SET NULL" Đặt authorId = null nếu xóa author
  @JoinColumn( //!JoinColumn() (Chỉ được đặt 1 bên) dùng cho OneToOne, ManyToOne(Có thể bỏ qua)
    { name: "authorId", referencedColumnName: "id" }
  ) 
  author: UserEntity; 


  //!ManyToMany: (Không dùng)
  // @ManyToMany(() => CategoryEntity, (category: CategoryEntity) => category.tasks, {nullable: true})
  // @JoinTable() //!JoinTable() (Chỉ được đặt 1 bên) dùng cho ManyToMany
  // public categories: CategoryEntity[];
  //!Custom ManyToMany: (Dùng)
  @OneToMany(() => TaskToCategoryEntity, taskToCategory => taskToCategory.task, {nullable: true, cascade: ['insert']} )
  //!Không onDelete: "CASCADE" thì Xóa Relation TaskToCategory Không Xóa luôn Task
  public taskToCategory: TaskToCategoryEntity[];
}

