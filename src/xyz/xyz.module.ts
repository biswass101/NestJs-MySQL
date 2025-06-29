import { Module } from '@nestjs/common';
import { XyzService } from './xyz.service';

@Module({
  providers: [XyzService]
})
export class XyzModule {}
