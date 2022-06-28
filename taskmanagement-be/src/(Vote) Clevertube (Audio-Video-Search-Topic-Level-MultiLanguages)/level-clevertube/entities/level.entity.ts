import { BooleanEnum } from '../../common-clevertube/constants/global.constant';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LevelTranslation } from './level-translation.entity';
import { BaseEntity } from '../../common-clevertube/entities/base.entity'; //version, createAt, updateAt, deleteAt

@Entity()
export class Level extends BaseEntity {
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
    () => LevelTranslation,
    (levelTranslate: LevelTranslation) => levelTranslate.level,
    {
      cascade: ['insert'],
    },
  )
  translates: LevelTranslation[];
}
