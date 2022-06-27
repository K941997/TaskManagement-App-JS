import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { LevelAdminController } from './controllers/level-admin.controller';
import { LevelClientController } from './controllers/level-client.controller';
import { LevelTranslation } from './entities/level-translation.entity';
import { Level } from './entities/level.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../utils-module/utils.module';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([Level, LevelTranslation])], //UtilsModule has i18n
  controllers: [LevelAdminController, LevelClientController],
  providers: [LevelService],
})
export class LevelModule {}
