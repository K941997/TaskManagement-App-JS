import { ApiProperty } from '@nestjs/swagger';
import {
  IsValidText,
  IsValidArrayObject,
} from '../../../common-clevertube/decorators/custom-validator.decorator';

class AudioTranscriptWord {
  @ApiProperty({ required: false })
  @IsValidText({ required: false })
  start_time: string;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  content: string;

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  type: string;
}

export class UpdateAudioTranscriptDto {
  @ApiProperty({ required: true })
  @IsValidArrayObject({ required: true }, AudioTranscriptWord)
  content: AudioTranscriptWord[];

  @ApiProperty({ required: true })
  @IsValidText({ required: true })
  startTime: string;
}
