import { Injectable } from '@nestjs/common';
import { VideosRepository } from '../repositories/videos.repository';

@Injectable()
export class VideosClientService {
  constructor(private videosRepo: VideosRepository) {}

  async getVideosDetail(id: number) {
    return this.videosRepo
      .createQueryBuilder('videos')
      .leftJoinAndSelect('videos.videosType', 'videosType')
      .leftJoinAndSelect('videos.videoTranscripts', 'videoTranscripts')
      .leftJoinAndSelect(
        'videos.videoHighlightWords',
        'videoHighlightWords',
      )
      .leftJoinAndSelect('videoHighlightWords.evDict', 'evDict')
      .leftJoinAndSelect('videos.level', 'level')
      .leftJoinAndSelect('level.translates', 'levelTranslations')
      .leftJoinAndSelect('videos.videosToTopics', 'videosToTopics')
      .leftJoinAndSelect('videosToTopics.topic', 'topic')
      .leftJoinAndSelect('topic.translates', 'topicTranslations')
      .where('videos.id = :id', { id })
      .getOne();
  }
}
