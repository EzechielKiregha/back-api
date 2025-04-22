import { Injectable } from '@nestjs/common';
import { CreateReOwnedProductInput } from './dto/create-re-owned-product.input';
import { UpdateReOwnedProductInput } from './dto/update-re-owned-product.input';

@Injectable()
export class ReOwnedProductService {
  create(createReOwnedProductInput: CreateReOwnedProductInput) {
    return 'This action adds a new reOwnedProduct';
  }

  findAll() {
    return `This action returns all reOwnedProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reOwnedProduct`;
  }

  update(id: number, updateReOwnedProductInput: UpdateReOwnedProductInput) {
    return `This action updates a #${id} reOwnedProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} reOwnedProduct`;
  }
}
