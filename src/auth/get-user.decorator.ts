import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Auth } from './schema/auth.schema';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): Auth => {
    const req = ctx.switchToHttp().getRequest();
    if (req.user.isActive) {
      return req.user;
    }else{
      throw new UnauthorizedException()
    }
  },
);
