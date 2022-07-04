import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../common/constants/global.constant';
import { FilterVideoDto } from '../dtos/client/req/filter-video.dto';
import { VideosClientService } from '../services/videos-client.service';

@Controller(`${PrefixType.CLIENT}/videos`)
@ApiTags('Videos Client')
export class VideosClientController {
  constructor(private readonly videosClientService: VideosClientService) {}

  @Get(':id')
  getVideoDetail(@Param('id', ParseIntPipe) id: number) {
    return this.videosClientService.getVideosDetail(id);
  }

  @Get()
  filterAndGetVideo(@Query() query: FilterVideoDto) {
    return this.videosClientService.filterAndGetVideo(query);
  }
}
