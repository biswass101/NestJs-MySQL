import { Test, TestingModule } from '@nestjs/testing';
import { CrudTestController } from './crud-test.controller';
import { CrudTestService } from './crud-test.service';

describe('CrudTestController', () => {
  let controller: CrudTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudTestController],
      providers: [CrudTestService],
    }).compile();

    controller = module.get<CrudTestController>(CrudTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
