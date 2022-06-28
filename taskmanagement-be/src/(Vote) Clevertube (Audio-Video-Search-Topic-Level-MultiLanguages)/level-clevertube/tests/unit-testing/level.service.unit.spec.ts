import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { LevelService } from '../../level.service';
import { Level } from '../../entities/level.entity';
import { LevelTranslation } from '../../entities/level-translation.entity';
import { TranslateService } from '../../../utils-module/services/translate.service';
import { CreateLevelDto } from '../../dto/create-level.dto';
import { BooleanEnum, LangEnum } from '../../../common-clevertube/constants/global.constant';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FindManyLevelsDto, FindOneLevelDto } from '../../dto/find-level.dto';
import { UpdateLevelDto } from '../../dto/update-level.dto';
import { DeleteResult, Repository } from 'typeorm';

// import * as sinon from 'sinon'; //sinon mock Repository

//!mock Creator, User, Admin:
// const mockRequest = httpMocks.createRequest();
// mockRequest.user = new User(); //!table Relation
// mockRequest.user.firstName = "Khanh"; //!table Relation

const mockDeleteResult: DeleteResult = { //normal
  raw: [],
  affected: 1,
}

class mockLevelService { //normal
  create(createLevelDto: CreateLevelDto){ 
    return {
      ...createLevelDto,
    };
  }
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
  }
  findOne(key: string, params: FindOneLevelDto) {
    return {
      key,
      ...params
    }
  }
  update(key: string, updateLevelDto: UpdateLevelDto) {
    return {
      key,
      ...updateLevelDto,
    }
  }
  remove() {
    return mockDeleteResult;
  }
  removeMulti() {
    return mockDeleteResult;
  }
}

describe.only('LevelService', () => {
  let levelService: LevelService;
  // let sandbox: sinon.SinonSandbox; //sinon mock Repository
  // let jestMock: jest.Mock; //jest mock

  beforeAll(async () => {
    // sandbox = sinon.createSandbox(); //sinon mock Repository
    // jestMock = jest.fn(); //jest mock

    const mockLevelServiceProvider = { //normal
      provide: LevelService,
      useClass: mockLevelService,
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [ //!Write 1.Custom Provider = 2. .override().useValue() or 3. LevelService Constructor's items
        LevelService,
        mockLevelServiceProvider, //normal
        // {
        //   provide: getRepositoryToken(Level), 
        //   useValue: sinon.createStubInstance(Repository) //sinon mock Repository
        //   useValue: { jestMock } //jest mock
        // }
      ],
    }).compile();

    levelService = module.get<LevelService>(LevelService);
    // levelService = await module.get(LevelService); //sinon mock Repository      

  });

  
  it('should be defined', () => {
    expect(levelService).toBeDefined();
  })

  describe('CRUD Levels', () => {
    it('should create a level by admin', async () => {
      const dto = new CreateLevelDto();
      const createLevelSpy = jest.spyOn(levelService, 'create');
      levelService.create(dto);
      expect(createLevelSpy).toHaveBeenCalledWith(dto);
    })
  
    it('should find all levels by admin', async () => {
      const dto = new FindManyLevelsDto();
      const paginationOptions = { page: 1, limit: 10 }
      const findManyLevelsSpy = jest.spyOn(levelService, 'findAllByAdmin');
      levelService.findAllByAdmin(paginationOptions, dto);
      expect(findManyLevelsSpy).toHaveBeenCalledWith(paginationOptions, dto);
    })
  
    it('should find one level by admin', async () => {
      const dto = new FindOneLevelDto();
      const levelKey = "level 1";
      const findOneLevelSpy = jest.spyOn(levelService, 'findOne');
      levelService.findOne(levelKey, dto);
      expect(findOneLevelSpy).toHaveBeenCalledWith(levelKey, dto)
    })
  
    it('should update one level by admin', async () => {
      const dto = new UpdateLevelDto();
      const levelKey = 'level 1';
      const updateOneLevelSpy = jest.spyOn(levelService, 'update');
      levelService.update(levelKey, dto);
      expect(updateOneLevelSpy).toHaveBeenCalledWith(levelKey, dto);
    })
  
    it('should remove one level by admin', async () => {
      const levelKey = 'level 1';
      const removeOneLevelSpy = jest.spyOn(levelService, 'remove');
      levelService.remove(levelKey);
      expect(removeOneLevelSpy).toHaveBeenCalledWith(levelKey);
    })
  
    it('should remove multi levels by admin', async () => {
      const levelKeys = ['level 1', 'level 2']
      const removeMultiLevelsSpy = jest.spyOn(levelService, 'removeMulti');
      levelService.removeMulti(levelKeys);
      expect(removeMultiLevelsSpy).toHaveBeenCalledWith(levelKeys);
    })
  
    // afterAll(async () => { //sinon mock Repository
    //   sandbox.restore();
    // });
    
  })
  
});
