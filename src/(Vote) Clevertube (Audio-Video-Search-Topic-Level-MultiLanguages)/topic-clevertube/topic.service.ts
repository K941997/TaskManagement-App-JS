import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  DeleteResult,
  In,
  IsNull,
  Like,
  Not,
  Repository,
} from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { TopicTranslation } from './entities/topic-translation.entity';
import { FindConditions } from 'typeorm';
import { TranslateService } from '../utils-module/services/translate.service';
import {
  ConflictExc,
  NotFoundExc,
} from '../common-clevertube/exceptions/custom.exception';
import { FindManyTopicDto, FindTopicDto } from './dto/find-topic.dto';

import slug from 'slug';
import { LangEnum } from '../common-clevertube/constants/global.constant';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicTranslation)
    private topicTransRepo: Repository<TopicTranslation>,

    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,

    private translateService: TranslateService,
  ) {}

  slugify(key: string) {
    return slug(key, { lower: true }).toString();
  }

  async findOneTransWith(opts: FindConditions<TopicTranslation>) {
    const exist = await this.topicTransRepo.findOne({
      where: opts,
    });
    return exist;
  }

  //Admin CREATE Topic (MultiLanguage):
  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    const { key, description, name, lang, enabled } = createTopicDto;
    //check existTrans of any Topic:
    const existTranslate = await this.findOneTransWith({ name });
    const topicLocalize = await this.translateService.t('main.entity.topic'); //i18n
    if (existTranslate) throw new ConflictExc(topicLocalize);
    //check existTopic:
    const existTopic = await this.topicRepository.findOne({ key: key });
    if (existTopic) throw new ConflictExc(topicLocalize);
    //create Topic:
    const newTopic = this.topicRepository.create(createTopicDto);
    newTopic.slug = this.slugify(key); //slug
    //create trans for Topic:
    const newTopicTranslate = this.topicTransRepo.create(createTopicDto);
    newTopic.translates = [newTopicTranslate];
    return this.topicRepository.save(newTopic);
  }

  //Admin GETALL Topics + Search(slug) + Pagination (MultiLanguage):
  async findAllByAdmin(
    options: IPaginationOptions,
    params: FindManyTopicDto,
  ): Promise<Pagination<Topic>> {
    const { lang, enabled, slug } = params;
    const opts: FindConditions<Topic> = {
      ...(enabled && { enabled }),
    };
    const queryBuilder = this.topicRepository.createQueryBuilder('topic');
    queryBuilder
      .innerJoinAndSelect(
        'topic.translates',
        'topicTranslation',
        lang && 'topicTranslation.lang = :lang',
        {
          lang,
        },
      )
      .where((queryBuilder) => {
        queryBuilder.where(opts);
        if (slug)
          queryBuilder.andWhere('topic.slug LIKE :slug', { slug: `%${slug}%` });
      })
      .orderBy('topic.key', 'ASC');

    return paginate<Topic>(queryBuilder, options);
  }

  //Admin GETONE Topic (MultiLanguage):
  async findOne(key: string, params: FindTopicDto) {
    const { lang, enabled } = params;
    const existTopic = await this.topicRepository
      .createQueryBuilder('topic')
      .innerJoinAndSelect(
        'topic.translates',
        'topicTranslation',
        lang && 'topicTranslation.lang = :lang',
        {
          lang,
        },
      )
      .where({
        key,
        ...(enabled && { enabled }),
      })
      .getOne();

    // i18n:
    const topicLocalize = await this.translateService.t('main.entity.topic');
    if (!existTopic) throw new NotFoundExc('Not Found ' + topicLocalize);
    return existTopic;
  }

  //Admin UPDATEONE Topic (MultiLanguage):
  async update(key: string, updateTopicDto: UpdateTopicDto) {
    const { description, name, lang, enabled } = updateTopicDto;

    //check existTopic:
    const existTopic = await this.topicRepository.findOne({ key: key });
    if (!existTopic) {
      throw new NotFoundException('Topic not found');
    }

    //check existTrans:
    const existTrans = await this.findOneTransWith({
      topicKey: key,
      lang,
    });

    //check existTransName of other Level:
    const existTransName = await this.findOneTransWith({
      topicKey: Not(key),
      name,
    });
    const topicLocal = await this.translateService.t('main.entity.topic'); //i18n
    if (existTransName)
      throw new ConflictException('Duplicate TransName ' + topicLocal);

    //update Topic:
    //cant update key because it's primary key
    if (description) {
      existTopic.description = description;
    }
    if (enabled) {
      existTopic.enabled = enabled;
    }
    await this.topicRepository.save(existTopic);

    //update Trans
    //existTrans -> update, !existTrans -> add new:
    const payloadTopicTranslate: DeepPartial<TopicTranslation> = {
      ...(existTrans && { id: existTrans.id }),
      topicKey: key,
      ...updateTopicDto,
    };

    await this.topicTransRepo.save(payloadTopicTranslate);
    return this.findOne(key, { lang: lang });
  }

  //Admin REMOVEONE Topic (MultiLanguage):
  async remove(key: string) {
    const topicToDelete = await this.topicRepository.findOne(key);
    if (!topicToDelete) {
      throw new NotFoundException(`Topic not found !`);
    }
    return await Promise.all([
      this.topicRepository.softDelete({ key: key, deletedAt: IsNull() }),
      this.topicTransRepo.softDelete({ topicKey: key, deletedAt: IsNull() }),
    ]);
  }

  //Admin REMOVEMULTI Topics (MultiLanguage):
  async removeMulti(keys: string[]) {
    const [result] = await Promise.all([
      this.topicRepository.softDelete({ key: In(keys), deletedAt: IsNull() }),
      this.topicTransRepo.softDelete({
        topicKey: In(keys),
        deletedAt: IsNull(),
      }),
    ]);

    const localize = await this.translateService.t('main.entity.topic'); //i18n
    if (!result.affected) throw new NotFoundExc(localize);
    return result;
  }

  //Client GETALL Topics + No Pagination (MultiLanguage):
  async findAllByClientNoPagination(
    params: FindManyTopicDto,
  ): Promise<Topic[]> {
    const { lang, enabled } = params;
    const opts: FindConditions<Topic> = {
      ...(enabled && { enabled }),
    };
    const queryBuilder = this.topicRepository
      .createQueryBuilder('topic')
      .innerJoinAndSelect(
        'topic.translates',
        'topicTranslation',
        lang && 'topicTranslation.lang = :lang',
        {
          lang,
        },
      )
      .where(opts)
      .orderBy('topic.key', 'ASC')
      .getMany();

    return queryBuilder;
  }

  //Client GETALL Topics + Pagination (MultiLanguage):
  async findAllByClientPagination(
    options: IPaginationOptions,
    params: FindManyTopicDto,
  ): Promise<Pagination<Topic>> {
    const { lang, enabled } = params;
    const opts: FindConditions<Topic> = {
      ...(enabled && { enabled }),
    };
    const queryBuilder = this.topicRepository.createQueryBuilder('topic');
    queryBuilder
      .innerJoinAndSelect(
        'topic.translates',
        'topicTranslation',
        lang && 'topicTranslation.lang = :lang',
        {
          lang,
        },
      )
      .where(opts)
      .orderBy('topic.key', 'ASC');

    return paginate<Topic>(queryBuilder, options);
  }
}
