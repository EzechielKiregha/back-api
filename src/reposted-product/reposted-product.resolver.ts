import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RepostedProductService } from './reposted-product.service';
import { RepostedProductEntity } from './entities/reposted-product.entity';
import { CreateRepostedProductInput } from './dto/create-reposted-product.input';
import { UpdateRepostedProductInput } from './dto/update-reposted-product.input';

@Resolver(() => RepostedProductEntity)
export class RepostedProductResolver {
  constructor(private readonly repostedProductService: RepostedProductService) {}

  @Mutation(() => RepostedProductEntity)
  createRepostedProduct(@Args('createRepostedProductInput') createRepostedProductInput: CreateRepostedProductInput) {
    return this.repostedProductService.create(createRepostedProductInput);
  }

  @Query(() => [RepostedProductEntity], { name: 'repostedProduct' })
  findAll() {
    return this.repostedProductService.findAll();
  }

  @Query(() => RepostedProductEntity, { name: 'repostedProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.repostedProductService.findOne(id);
  }

  @Mutation(() => RepostedProductEntity)
  updateRepostedProduct(@Args('updateRepostedProductInput') updateRepostedProductInput: UpdateRepostedProductInput) {
    return this.repostedProductService.update(updateRepostedProductInput.id, updateRepostedProductInput);
  }

  @Mutation(() => RepostedProductEntity)
  removeRepostedProduct(@Args('id', { type: () => Int }) id: number) {
    return this.repostedProductService.remove(id);
  }
}
