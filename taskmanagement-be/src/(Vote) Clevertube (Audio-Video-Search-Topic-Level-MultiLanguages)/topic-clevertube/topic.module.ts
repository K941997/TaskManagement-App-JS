import { Module } from '@nestjs/common';
import { TopicService } from './topic.service';
import { TopicController } from './topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { TopicByAdminController } from './controllers/topic-by-admin.controller';
import { TopicByClientController } from './controllers/topic-by-client.controller';
// import { SlugProvider } from './slug/slug.provider';
import { TopicTranslation } from './entities/topic-translation.entity';
import { UtilsModule } from '../utils-module/utils.module';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([Topic, TopicTranslation])],
  controllers: [TopicByAdminController, TopicByClientController],
  providers: [TopicService],
  // providers: [SlugProvider, TopicService]
})
export class TopicModule {}
