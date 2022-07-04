import { Injectable } from '@nestjs/common';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { NotFoundExc } from '../../common/exceptions/custom.exception';
import { FilterVideoDto } from '../dtos/client/req/filter-video.dto';
import { VideosRepository } from '../repositories/videos.repository';

@Injectable()
export class VideosClientService {
  constructor(private videosRepo: VideosRepository) {}

  async getVideosDetail(id: number) {
    const video = await this.videosRepo.getVideoDetails(id);
    if (!video) throw new NotFoundExc('Video not found');
    return video;
  }

  async filterAndGetVideo(dataDto: FilterVideoDto) {
    const { levelKey, topicKeys, limit, page } = dataDto;
    const queryBuilder = this.videosRepo
      .createQueryBuilder('videos')
      .leftJoin('videos.videosToTopics', 'videosToTopics')
      .groupBy('videos.id');

    if (levelKey)
      queryBuilder.andWhere('videos.levelKey = :levelKey', { levelKey });
    if (topicKeys && topicKeys.length)
      queryBuilder.andWhere('videosToTopics.topicKey IN (:...topicKeys)', {
        topicKeys,
      });

    const results = await paginate(queryBuilder, { limit, page });
    return results;
  }
}
