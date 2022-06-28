import { IsValidNumber } from '../../../../common-clevertube/decorators/custom-validator.decorator';

export class RemoveHighlightWordDto {
  @IsValidNumber({ required: true })
  highlightWordId: number;
}
