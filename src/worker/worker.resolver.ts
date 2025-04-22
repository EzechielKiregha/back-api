import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkerService } from './worker.service';
import { WorkerEntity } from './entities/worker.entity';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';

@Resolver(() => WorkerEntity)
export class WorkerResolver {
  constructor(private readonly workerService: WorkerService) {}

  @Mutation(() => WorkerEntity)
  createWorker(@Args('createWorkerInput') createWorkerInput: CreateWorkerInput) {
    return this.workerService.create(createWorkerInput);
  }

  @Query(() => [WorkerEntity], { name: 'worker' })
  findAll() {
    return this.workerService.findAll();
  }

  @Query(() => WorkerEntity, { name: 'worker' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.findOne(id);
  }

  @Mutation(() => WorkerEntity)
  updateWorker(@Args('updateWorkerInput') updateWorkerInput: UpdateWorkerInput) {
    return this.workerService.update(updateWorkerInput.id, updateWorkerInput);
  }

  @Mutation(() => WorkerEntity)
  removeWorker(@Args('id', { type: () => Int }) id: number) {
    return this.workerService.remove(id);
  }
}
