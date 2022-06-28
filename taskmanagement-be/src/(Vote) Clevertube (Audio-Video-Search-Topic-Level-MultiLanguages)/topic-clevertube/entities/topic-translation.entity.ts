import { Unique } from 'typeorm';
import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  LangEnum,
  NameConstraintEntity,
} from '../../common-clevertube/constants/global.constant';
import { ColumnString } from '../../common-clevertube/decorators/custom-column.decorator';
import { BaseEntity } from '../../common-clevertube/entities/base.entity';
import { getEnumStr } from '../../common-clevertube/utils';
import { Topic } from './topic.entity';

/**
 * One topic can be exist in many article, post....
 */
@Entity()
@Unique(`${NameConstraintEntity.UQ_TOPIC_TRANSLATE_1}`, ['topicKey', 'lang'])
@Check(
  `${NameConstraintEntity.CHK_TOPIC_TRANSLATE_1}`,
  `"lang" IN (${getEnumStr(LangEnum)})`,
)
export class TopicTranslation extends BaseEntity {
  @PrimaryGeneratedColumn({})
  id: number;

  @ColumnString({ unique: true })
  name: string;

  @ColumnString({ default: LangEnum.En, enum: LangEnum })
  lang: LangEnum;

  @Column({ name: 'topic_key' })
  topicKey: string;

  @ManyToOne(() => Topic, (topic) => topic.translates, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'topic_key', referencedColumnName: 'key' },
    // { name: 'topic_id', referencedColumnName: 'id' },
  ])
  topic: Topic;
}
