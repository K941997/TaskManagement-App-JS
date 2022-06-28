import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudioRepository } from '../audio/repository/audio.repository';
import { VideosRepository } from '../videos/repositories/videos.repository';
import { AdminSearchController } from './admin/admin-search.controller';
import { AdminSearchService } from './admin/admin-search.service';
import { ClientSearchController } from './client/client-search.controller';
import { ClientSearchService } from './client/client-search.service';
import { UserSearchsRepository } from './repositories/user-highlight-words.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserSearchsRepository,
      VideosRepository,
      AudioRepository,
    ]),
  ],
  controllers: [ClientSearchController, AdminSearchController],
  providers: [ClientSearchService, AdminSearchService],
})
export class SearchModule {}
