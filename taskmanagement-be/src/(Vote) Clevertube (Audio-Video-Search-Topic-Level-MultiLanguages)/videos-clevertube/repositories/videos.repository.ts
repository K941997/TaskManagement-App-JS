import { EntityRepository, Repository } from 'typeorm';
import { Videos } from '../entities/videos.entity';

@EntityRepository(Videos)
export class VideosRepository extends Repository<Videos> {}
