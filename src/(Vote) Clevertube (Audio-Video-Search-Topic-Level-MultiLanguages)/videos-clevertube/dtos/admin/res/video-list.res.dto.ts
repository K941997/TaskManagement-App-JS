import { PaginationResultDto } from '../../../../common-clevertube/dtos/pagination.dto';
import { Videos } from '../../../entities/videos.entity';

export class VideoListResDto extends PaginationResultDto {
  items: Videos[];
}
