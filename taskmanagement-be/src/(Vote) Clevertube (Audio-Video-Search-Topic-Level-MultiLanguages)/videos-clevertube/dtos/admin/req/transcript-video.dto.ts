import {  IsUrl } from 'class-validator';
import { IsValidEnum } from '../../../../common-clevertube/decorators/custom-validator.decorator';
import { VideoTypeKey } from '../../../enums/video-type-key.enum';

export class TranscriptVideoDto {
  @IsUrl()
  url: string;

  @IsValidEnum({enum: VideoTypeKey, required: true})
  videoType: VideoTypeKey
}
