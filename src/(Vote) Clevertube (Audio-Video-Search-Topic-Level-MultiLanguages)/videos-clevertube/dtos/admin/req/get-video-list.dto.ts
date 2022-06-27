import { IsValidText } from '../../../../common-clevertube/decorators/custom-validator.decorator';
import { PaginationQueryDto } from '../../../../common-clevertube/dtos/pagination.dto';

export class GetVideoListDto extends PaginationQueryDto {
  @IsValidText({ required: false, maxLength: 100 })
  search?: string;
}
