import { IsValidNumber, IsValidText } from "../../../../common-clevertube/decorators/custom-validator.decorator";


export class RemoveVideoTopicDto {
  @IsValidNumber({required: true})
  videoToTopicId: number
}