import {
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../common/constants/global.constant';
import { Authenticate, GetUser } from '../../common/decorators/auth.decorator';
import { User } from '../../user/entities/user.entity';
import { ClientSearchService } from './client-search.service';
import { SearchContentsReqDto } from './dtos/req/search-contents.req.dto';

@Controller(`${PrefixType.CLIENT}/search`)
@ApiTags('Client search')
@Authenticate()
export class ClientSearchController {
  constructor(private readonly clientSearchService: ClientSearchService) {}

  @Get('contents')
  searchContents(@Query() query: SearchContentsReqDto, @GetUser() user: User) {
    return this.clientSearchService.searchContents(query, user);
  }

  @Get('history')
  getUserSearchHistory(
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @GetUser()
    user: User,
  ) {
    return this.clientSearchService.getUserSearchHistory(user, size);
  }

  @Delete(':searchId')
  deleteUserSeachHistory(
    @Param('searchId', ParseIntPipe) searchId: number,
    @GetUser() user: User,
  ) {
    return this.clientSearchService.deleteSearchHistory(searchId, user);
  }
}
