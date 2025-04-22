import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RepostedProductService } from './reposted-product.service';
import { RepostedProductEntity } from './entities/reposted-product.entity';
import { CreateRepostedProductInput } from './dto/create-reposted-product.input';
import { UpdateRepostedProductInput } from './dto/update-reposted-product.input';

@Resolver(() => RepostedProductEntity)
export class RepostedProductResolver {
  constructor(private readonly repostedProductService: RepostedProductService) {}
}
