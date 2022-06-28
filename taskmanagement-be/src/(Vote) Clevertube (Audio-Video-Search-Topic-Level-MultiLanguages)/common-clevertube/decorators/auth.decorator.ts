import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../../auth/guard/firebase-auth.guard';

export const Authenticate = () =>
  applyDecorators(UseGuards(FirebaseAuthGuard), ApiBearerAuth());

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
