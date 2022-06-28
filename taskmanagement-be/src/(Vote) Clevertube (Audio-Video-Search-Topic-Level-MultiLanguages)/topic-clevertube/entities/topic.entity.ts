import { BaseEntity } from '../../common-clevertube/entities/base.entity';

import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TopicTranslation } from './topic-translation.entity';
import { BooleanEnum } from '../../common-clevertube/constants/global.constant';

@Entity()
export class Topic extends BaseEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn()
  key: string;

  @Column({
    nullable: true,
  })
  slug: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({ enum: BooleanEnum, default: BooleanEnum.TRUE })
  enabled: BooleanEnum;

  @OneToMany(
    () => TopicTranslation,
    (topicTranslate: TopicTranslation) => topicTranslate.topic,
    {
      cascade: ['insert'],
    },
  )
  translates: TopicTranslation[];
}
