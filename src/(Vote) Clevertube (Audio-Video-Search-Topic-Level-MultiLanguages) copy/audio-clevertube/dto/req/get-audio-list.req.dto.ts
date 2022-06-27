import { IsValidText } from '../../../common-clevertube/decorators/custom-validator.decorator';
import { PaginationQueryDto } from '../../../common-clevertube/dtos/pagination.dto';

export class GetAudioListReqDto extends PaginationQueryDto {
  @IsValidText({ required: false, maxLength: 100 })
  search?: string;

  @IsValidText({ required: false, maxLength: 100 })
  topicKey?: string;

  @IsValidText({ required: false, maxLength: 100 })
  levelKey?: string;
}
