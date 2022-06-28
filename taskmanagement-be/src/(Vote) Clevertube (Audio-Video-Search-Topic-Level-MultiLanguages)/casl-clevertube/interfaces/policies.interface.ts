import { Resource, ActionAbility, Action } from '../../common-clevertube/enums/global.enum';

export interface IPolicies {
  action: Action;
  resource: Resource;
  actionAbility: ActionAbility;
}
