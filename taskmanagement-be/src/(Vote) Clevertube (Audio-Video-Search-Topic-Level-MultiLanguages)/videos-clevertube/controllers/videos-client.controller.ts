import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrefixType } from '../../common-clevertube/constants/global.constant';
import { VideosClientService } from '../services/videos-client.service';

@Controller(`${PrefixType.CLIENT}/videos`)
@ApiTags('Videos Client')
export class VideosClientController {
  constructor(private readonly videosClientService: VideosClientService) {}

  @Get(':id')
  getVideoDetail(@Param('id', ParseIntPipe) id: number) {
    return this.videosClientService.getVideosDetail(id);
  }
}
