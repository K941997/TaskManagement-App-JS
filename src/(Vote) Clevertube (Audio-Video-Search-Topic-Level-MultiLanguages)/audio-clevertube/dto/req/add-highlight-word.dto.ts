import {
  IsValidArrayString,
  IsValidNumber,
} from '../../../common-clevertube/decorators/custom-validator.decorator';

export class AddHighlightWordDto {
  @IsValidNumber()
  audioId: number;

  @IsValidArrayString({ unique: true })
  words: string[];
}
