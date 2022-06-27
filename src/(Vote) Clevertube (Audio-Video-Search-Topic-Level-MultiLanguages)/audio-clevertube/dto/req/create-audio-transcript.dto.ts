import { ApiProperty } from '@nestjs/swagger';
import { SupportedAudioFileType } from '../../../common-clevertube/constants/global.constant';
import {
  IsValidEnum, IsValidNumber,
  IsValidText
} from '../../../common-clevertube/decorators/custom-validator.decorator';
import { getValEnumStr } from '../../../common-clevertube/utils';

export class CreateAudioTranscriptDto {
  @ApiProperty({ required: true })
  @IsValidNumber()
  audioId: number;

  @ApiProperty({ required: true })
  @IsValidText()
  audioCode: string;

  @ApiProperty({ enum: getValEnumStr(SupportedAudioFileType), required: true })
  @IsValidEnum({ enum: SupportedAudioFileType })
  mediaFormat: string;
}
