import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BusinessService } from './business.service';
import { BusinessEntity } from './entities/business.entity';
import { CreateBusinessInput } from './dto/create-business.input';
import { UpdateBusinessInput } from './dto/update-business.input';

@Resolver(() => BusinessEntity)
export class BusinessResolver {
  constructor(private readonly businessService: BusinessService) {}

  @Mutation(() => BusinessEntity)
  createBusiness(@Args('createBusinessInput') createBusinessInput: CreateBusinessInput) {
    return this.businessService.create(createBusinessInput);
  }

  @Query(() => [BusinessEntity], { name: 'business' })
  findAll() {
    return this.businessService.findAll();
  }

  @Query(() => BusinessEntity, { name: 'business' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.businessService.findOne(id);
  }

  @Mutation(() => BusinessEntity)
  updateBusiness(@Args('updateBusinessInput') updateBusinessInput: UpdateBusinessInput) {
    return this.businessService.update(updateBusinessInput.id, updateBusinessInput);
  }

  @Mutation(() => BusinessEntity)
  removeBusiness(@Args('id', { type: () => Int }) id: number) {
    return this.businessService.remove(id);
  }
}
