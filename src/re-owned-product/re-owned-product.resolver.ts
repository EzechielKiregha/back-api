import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReOwnedProductService } from './re-owned-product.service';
import { ReOwnedProductEntity } from './entities/re-owned-product.entity';
import { CreateReOwnedProductInput } from './dto/create-re-owned-product.input';
import { UpdateReOwnedProductInput } from './dto/update-re-owned-product.input';

@Resolver(() => ReOwnedProductEntity)
export class ReOwnedProductResolver {
  constructor(private readonly reOwnedProductService: ReOwnedProductService) {}

  @Mutation(() => ReOwnedProductEntity)
  createReOwnedProduct(@Args('createReOwnedProductInput') createReOwnedProductInput: CreateReOwnedProductInput) {
    return this.reOwnedProductService.create(createReOwnedProductInput);
  }

  @Query(() => [ReOwnedProductEntity], { name: 'reOwnedProduct' })
  findAll() {
    return this.reOwnedProductService.findAll();
  }

  @Query(() => ReOwnedProductEntity, { name: 'reOwnedProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reOwnedProductService.findOne(id);
  }

  @Mutation(() => ReOwnedProductEntity)
  updateReOwnedProduct(@Args('updateReOwnedProductInput') updateReOwnedProductInput: UpdateReOwnedProductInput) {
    return this.reOwnedProductService.update(updateReOwnedProductInput.id, updateReOwnedProductInput);
  }

  @Mutation(() => ReOwnedProductEntity)
  removeReOwnedProduct(@Args('id', { type: () => Int }) id: number) {
    return this.reOwnedProductService.remove(id);
  }
}
