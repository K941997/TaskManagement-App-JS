/* eslint-disable prettier/prettier */
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { TaskEntity } from 'src/tasks/entity/task.entity';
import { Role } from '../role/role.enum';
import Address from './address.entity';

@Entity()
@Unique(['username']) //Không trùng lặp username
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true}) //!Vì signUp signIn chỉ lấy DTO username password nên UserEntity phải nullable:true
  name: string;

  // @Column({nullable: true}) //!Vì signUp signIn chỉ lấy DTO username password nên UserEntity phải nullable:true
  // address: string;

  @Column({type: 'enum', enum: Role, default: Role.USER}) //!Bỏ, thay = CASL
  role: Role

  @Column({nullable: true}) //!CASL Role + isCreator thay cho role
  isAdmin: boolean;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.author, { eager: false, cascade: true })
  //eager: false (Không load tasks)
  tasks: TaskEntity[];

  @OneToOne(() => Address, {nullable: true, eager: true, cascade: true})
  @JoinColumn( //!JoinColumn() (Chỉ được đặt 1 bên) dùng cho OneToOne, ManyToOne(Có thể bỏ qua)
    { name: "address_id", referencedColumnName: "id" }
  )
  address: Address;

}
