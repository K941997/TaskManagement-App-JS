/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable, Req } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserEntity } from "src/auth/user/user.entity";
import { CHECK_POLICIES_KEY } from "./casl-ability.decorator";
import { AppAbility, CaslAbilityFactory } from "./casl-ability.factory";
import { PolicyHandler } from "./policyhandler.handler";

/* eslint-disable prettier/prettier */
@Injectable()
export class PoliciesGuard implements CanActivate {
  //!CASL Policies:
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    console.log(user)
    
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}