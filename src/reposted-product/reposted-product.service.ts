import { Injectable } from '@nestjs/common';
import { CreateRepostedProductInput } from './dto/create-reposted-product.input';
import { UpdateRepostedProductInput } from './dto/update-reposted-product.input';

@Injectable()
export class RepostedProductService {
  create(createRepostedProductInput: CreateRepostedProductInput) {
    return 'This action adds a new repostedProduct';
  }

  findAll() {
    return `This action returns all repostedProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repostedProduct`;
  }

  update(id: number, updateRepostedProductInput: UpdateRepostedProductInput) {
    return `This action updates a #${id} repostedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} repostedProduct`;
  }
}
