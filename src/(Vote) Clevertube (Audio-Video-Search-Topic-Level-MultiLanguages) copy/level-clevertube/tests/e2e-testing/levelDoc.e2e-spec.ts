import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { LevelModule } from '../../level.module';
import { LevelService } from '../../level.service';
import { INestApplication } from '@nestjs/common';
import { DeleteResult, getRepository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Level } from '../../entities/level.entity';
import { BooleanEnum, LangEnum } from '../../../common-clevertube/constants/global.constant';
import { response } from 'express';
import { LevelAdminController } from '../../controllers/level-admin.controller';
import { LevelTranslation } from '../../entities/level-translation.entity';
import { UtilsModule } from '../../../utils-module/utils.module';
import { CreateLevelDto } from '../../dto/create-level.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FindManyLevelsDto, FindOneLevelDto } from '../../dto/find-level.dto';
import { UpdateLevelDto } from '../../dto/update-level.dto';
import { AppModule } from '../../../../app.module';

describe('Levels E2E', () => {
    let app: INestApplication;

    const mockDeleteResult: DeleteResult = { //normal
        raw: [],
        affected: 1,
    }

    let mockLevelService = { 
        create(createLevelDto: CreateLevelDto){ 
            return {
            ...createLevelDto,
            };
        },
        findAllByAdmin(
            options: IPaginationOptions,
            params: FindManyLevelsDto,
        ) {
            const page = options.page;
            const limit = options.limit;
            return {
                page,
                limit,
                ...params
            }
        },
        findOne(key: string, params: FindOneLevelDto) {
            return {
                key,
                ...params
            }
        },
        update(key: string, updateLevelDto: UpdateLevelDto) {
            return {
                key,
                ...updateLevelDto,
            }
        },
        remove() {
            return mockDeleteResult;
        },
        removeMulti() {
            return mockDeleteResult;
        }
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
        imports: [ LevelModule ],
        })
            .overrideProvider(LevelService)
            .useValue(mockLevelService)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });
    
    describe('CRUD Levels', () => {
        // it('should create a level by admin', () => {
        //     let mockLevel: CreateLevelDto = {
        //         key: 'level 1',
        //         enabled: BooleanEnum.TRUE,
        //         description: 'this is level 1',
        //         name: 'level 1',
        //         lang: LangEnum.En
        //     }
        // });
        // it('should find all levels by admin', () => {
        //     const dto = new FindManyLevelsDto();
        //     const paginationOptions = { page: 1, limit: 10 };
        //     return request(app)
        //         .get('/admin/levels')
        //         .expect(200)
        //         .expect({
        //             data: mockLevelService.findAllByAdmin(paginationOptions, dto)
        //         })
        // });
        // it('should find one level by admin');
        // it('should update one level by admin');
        // it('should remove one level by admin');
        // it('should remove multi levels by admin');
    })

    afterAll(async () => {
        await app.close();
    }); 
});
