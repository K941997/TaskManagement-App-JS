/* eslint-disable prettier/prettier */
import { UserEntity } from './user/user.entity';
import { Request } from 'express';

export interface RequestWithUser extends Request { //!Dùng trong Task Controller
  user: UserEntity; //"user": {"username": "", "password": ""}
}
