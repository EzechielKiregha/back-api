import { Module } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { WorkerResolver } from './worker.resolver';

@Module({
  providers: [WorkerResolver, WorkerService],
})
export class WorkerModule {}
