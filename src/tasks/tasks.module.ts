/* eslint-disable prettier/prettier */
import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CaslModule } from 'src/casl/casl.module';
import { RedisCacheModule } from 'src/cacheRedis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule,

    CaslModule, //!CASL Role

    CacheModule.register({ //!In-memory Cache | Cache Manually:
      ttl: 10, //thời gian hết hạn của bộ nhớ Cache, sau khi xóa sẽ cập nhật danh sách sau 10s
      max: 100, //maximum number of items in Cache
    }),
  ],
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
