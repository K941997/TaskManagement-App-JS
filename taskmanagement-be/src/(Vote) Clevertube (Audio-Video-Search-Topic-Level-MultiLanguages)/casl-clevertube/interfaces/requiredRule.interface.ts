import { Action } from '../../common-clevertube/enums/global.enum';
import { Subjects } from '../casl-ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subjects;
}
