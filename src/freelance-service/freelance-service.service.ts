import { Injectable } from '@nestjs/common';
import { CreateFreelanceServiceInput } from './dto/create-freelance-service.input';
import { UpdateFreelanceServiceInput } from './dto/update-freelance-service.input';

@Injectable()
export class FreelanceServiceService {
  create(createFreelanceServiceInput: CreateFreelanceServiceInput) {
    return 'This action adds a new freelanceService';
  }

  findAll() {
    return `This action returns all freelanceService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} freelanceService`;
  }

  update(id: number, updateFreelanceServiceInput: UpdateFreelanceServiceInput) {
    return `This action updates a #${id} freelanceService`;
  }

  remove(id: number) {
    return `This action removes a #${id} freelanceService`;
  }
}
