import { Test, TestingModule } from '@nestjs/testing';
import { CrudTestService } from './crud-test.service';

describe('CrudTestService', () => {
  let service: CrudTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudTestService],
    }).compile();

    service = module.get<CrudTestService>(CrudTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
