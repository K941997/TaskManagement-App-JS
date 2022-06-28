import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { BooleanEnum, LangEnum } from '../../common-clevertube/constants/global.constant';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { FindManyTopicDto, FindTopicDto } from '../dto/find-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { Topic } from '../entities/topic.entity';
import { TopicService } from '../topic.service';

@Controller('client/topics')
export class TopicByClientController {
  constructor(private readonly topicService: TopicService) {}

  //Client GETALL Topics + No Pagination || Pagination (MultiLanguage):
  @Get()
  async findAllByClient(
    @Query() params: FindManyTopicDto, //language, enabled, slug
    @Query('page') page: number,
    @Query('limit') limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    params.enabled = BooleanEnum.TRUE;
    if (!params.lang) {
      params.lang = LangEnum.En;
    }

    //NoPagination:
    if (!page) return this.topicService.findAllByClientNoPagination(params);

    //Pagination:
    return this.topicService.findAllByClientPagination(
      {
        page: Number(page),
        limit: Number(limit),
        route: `http://localhost:${process.env.PORT}/client/topics?lang=${params.lang}`,
      },
      params,
    );
  }
}
