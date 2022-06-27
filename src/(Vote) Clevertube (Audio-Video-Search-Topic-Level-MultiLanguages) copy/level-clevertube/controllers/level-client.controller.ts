import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LevelService } from '../level.service';
import { FindManyLevelsDto } from '../dto/find-level.dto';
import { BooleanEnum, LangEnum } from '../../common-clevertube/constants/global.constant';

@Controller('client/levels')
export class LevelClientController {
  constructor(private readonly levelService: LevelService) {}

  //Client GETALL Levels + No Pagination || Pagination (MultiLanguage):
  @Get()
  async findAllByClient(
    @Query() params: FindManyLevelsDto, //language, enabled, slug, pageMin=1, limitMin=1
    @Query('page') page: number,
    @Query('limit') limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    params.enabled = BooleanEnum.TRUE; //admin: true or false, client: true
    if (!params.lang) {
      params.lang = LangEnum.En;
    }

    //NoPagination:
    if (!page) return this.levelService.findAllByClientNoPagination(params);

    //Pagination:
    return this.levelService.findAllByClientPagination(
      {
        page: Number(page),
        limit: Number(limit),
        route: `http://localhost:${process.env.PORT}/client/levels?lang=${params.lang}`,
      },
      params,
    );
  }
}
