import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VideoHighlightWords } from './video-highlight-words.entity';
import { Videos } from './videos.entity';

@Entity({ name: 'video_transcripts' })
export class VideoTranscripts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: 'start_time' })
  startTime: number;

  @Column()
  duration: number;

  // Join videos
  @Column({ name: 'videos_id' })
  videosId: number;

  @ManyToOne(() => Videos, (videos) => videos.videoTranscripts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: 'videos_id'})
  videos: Videos;
  // End join videos
}
