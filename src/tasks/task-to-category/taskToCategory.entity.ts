/* eslint-disable prettier/prettier */
import { CategoryEntity } from "src/categories/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskEntity } from "../task/task.entity";

//!Custom Relation ManyToMany:
@Entity()
export class TaskToCategoryEntity {
    @PrimaryGeneratedColumn()
    public taskToCategoryId: number

    @Column()
    public taskId: number

    @Column()
    public categoryId: number
    
    @ManyToOne(() => TaskEntity, (task) => task.taskToCategory, {onDelete: "CASCADE"})
    //!onDelete: Xóa Task Xóa luôn Relation TaskToCategory
    public task: TaskEntity

    @ManyToOne(() => CategoryEntity, (category) => category.taskToCategory, {onDelete: "CASCADE"})
    //!onDelete: Xóa Category Xóa luôn Relation TaskToCategory
    public category: CategoryEntity
}