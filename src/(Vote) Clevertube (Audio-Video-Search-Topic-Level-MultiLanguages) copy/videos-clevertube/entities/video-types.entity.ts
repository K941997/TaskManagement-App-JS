import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Videos } from './videos.entity';

@Entity({ name: 'video_types' })
export class VideoTypes {
  @PrimaryColumn({ length: '30' })
  key: string;

  @Column({ length: '255' })
  desc: string;

  @OneToMany(() => Videos, (videos) => videos.videosType, {
    cascade: ['insert'],
  })
  videos: Videos[];
}
