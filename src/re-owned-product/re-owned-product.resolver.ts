import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReOwnedProductService } from './re-owned-product.service';
import { ReOwnedProductEntity } from './entities/re-owned-product.entity';
import { CreateReOwnedProductInput } from './dto/create-re-owned-product.input';
import { UpdateReOwnedProductInput } from './dto/update-re-owned-product.input';

@Resolver(() => ReOwnedProductEntity)
export class ReOwnedProductResolver {
  constructor(private readonly reOwnedProductService: ReOwnedProductService) {}
}
