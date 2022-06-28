import { IsValidNumber, IsValidText } from "../../../../common-clevertube/decorators/custom-validator.decorator";

export class AddVideoTopicDto {
  @IsValidNumber({required: true})
  videoId: number

  @IsValidText({required: true})
  topicKey: string
}