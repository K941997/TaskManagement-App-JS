import { Test, TestingModule } from '@nestjs/testing';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';

describe('TopicController', () => {
  let controller: TopicController;

  const mockTopicService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TopicController],
      providers: [TopicService],
    })
      .overrideProvider(TopicService)
      .useValue(mockTopicService)
      .compile();

    controller = module.get<TopicController>(TopicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
