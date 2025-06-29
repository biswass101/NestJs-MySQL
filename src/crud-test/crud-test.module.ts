import { Module } from '@nestjs/common';
import { CrudTestService } from './crud-test.service';
import { CrudTestController } from './crud-test.controller';

@Module({
  controllers: [CrudTestController],
  providers: [CrudTestService],
})
export class CrudTestModule {}
