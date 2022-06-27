import { Controller } from '@nestjs/common';
import { PrefixType } from '../../common/constants/global.constant';
import { AdminSearchService } from './admin-search.service';

@Controller(`${PrefixType.ADMIN}/search`)
export class AdminSearchController {
  constructor(private readonly adminSearchService: AdminSearchService) {}
}
