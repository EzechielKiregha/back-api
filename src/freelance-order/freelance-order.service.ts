import { Injectable } from '@nestjs/common';
import { CreateFreelanceOrderInput } from './dto/create-freelance-order.input';
import { UpdateFreelanceOrderInput } from './dto/update-freelance-order.input';

@Injectable()
export class FreelanceOrderService {
  create(createFreelanceOrderInput: CreateFreelanceOrderInput) {
    return 'This action adds a new freelanceOrder';
  }

  findAll() {
    return `This action returns all freelanceOrder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freelanceOrder`;
  }

  update(id: number, updateFreelanceOrderInput: UpdateFreelanceOrderInput) {
    return `This action updates a #${id} freelanceOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} freelanceOrder`;
  }
}
