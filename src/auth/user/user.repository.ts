/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

//!Repository:
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
}
