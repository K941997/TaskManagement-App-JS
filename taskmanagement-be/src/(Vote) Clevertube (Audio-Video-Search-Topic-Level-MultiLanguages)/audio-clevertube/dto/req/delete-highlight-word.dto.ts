import {
  IsValidNumber,
  IsValidText,
} from '../../../common-clevertube/decorators/custom-validator.decorator';

export class DeleteHighlightWordDto {
  @IsValidNumber()
  audioId: number;

  @IsValidText()
  word: string;
}
