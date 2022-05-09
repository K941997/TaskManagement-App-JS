/* eslint-disable prettier/prettier */
import { AppAbility } from '../casl/casl-ability.factory';

//!Advanced CASL: Implementing a PoliciesGuard:
interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;