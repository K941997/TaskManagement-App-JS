import { Test, TestingModule } from '@nestjs/testing';
import { TopicService } from './topic.service';

describe('TopicService', () => {
  let service: TopicService;

  const mockTopicService = {

  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService],
    }) 
      .overrideProvider(TopicService)
      .useValue(mockTopicService)
      .compile();

    service = module.get<TopicService>(TopicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
