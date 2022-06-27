import { IsValidNumber } from "../../../../common-clevertube/decorators/custom-validator.decorator";

export class RemoveVideoTranscriptDto {
  @IsValidNumber({required: true})
  transcriptId: number
}