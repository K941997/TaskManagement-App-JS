import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BooleanEnum, LangEnum } from '../../common-clevertube/constants/global.constant';
import {
  IsValidEnumNumber,
  IsValidEnumString,
  IsValidNumber,
  IsValidText,
} from '../../common-clevertube/decorators/custom-validator.decorator';
import { Default } from '../../common-clevertube/decorators/default-value.decorator';
import PaginateDto from '../../common-clevertube/dtos/paginate.dto';

export class FindTopicDto {
  @IsValidEnumString({ enum: LangEnum, required: false })
  lang?: LangEnum;

  @IsValidNumber() //can't use IsValidEnumNumber()
  @IsOptional()
  enabled?: BooleanEnum; //admin: 1 or -1 || client: only 1
}

export class FindManyTopicDto extends PaginateDto {
  @IsValidText({ required: false })
  slug?: string;

  @IsValidEnumString({ enum: LangEnum, required: false })
  lang?: LangEnum; //lang=en

  @IsValidNumber() //can't use IsValidEnumNumber()
  @IsOptional()
  enabled?: BooleanEnum; //admin: 1 or -1 || client: only 1
}
