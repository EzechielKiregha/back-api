import { Injectable } from '@nestjs/common';
import { CreateWorkerInput } from './dto/create-worker.input';
import { UpdateWorkerInput } from './dto/update-worker.input';

@Injectable()
export class WorkerService {
  create(createWorkerInput: CreateWorkerInput) {
    return 'This action adds a new worker';
  }

  findAll() {
    return `This action returns all worker`;
  }

  findOne(id: number) {
    return `This action returns a #${id} worker`;
  }

  update(id: number, updateWorkerInput: UpdateWorkerInput) {
    return `This action updates a #${id} worker`;
  }

  remove(id: number) {
    return `This action removes a #${id} worker`;
  }
}
