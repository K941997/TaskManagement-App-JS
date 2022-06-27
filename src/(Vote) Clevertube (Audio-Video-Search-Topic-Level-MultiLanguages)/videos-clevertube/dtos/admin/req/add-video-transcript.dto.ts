import { IsValidNumber } from '../../../../common-clevertube/decorators/custom-validator.decorator';
import { TranscriptResultDto } from '../../../../common-clevertube/dtos/transciprt-result.dto';

export class AddVideoTranscriptDto extends TranscriptResultDto {
  @IsValidNumber({required: true})
  videoId: number
}
