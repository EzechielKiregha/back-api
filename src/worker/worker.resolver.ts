import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { WorkerEntity } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';

@Resolver(() => WorkerEntity)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}
}
