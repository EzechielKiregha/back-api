import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { KnowYourCustomerService } from './know-your-customer.service';
import { KnowYourCustomerEntity } from './entities/know-your-customer.entity';
import { CreateKnowYourCustomerInput } from './dto/create-know-your-customer.input';
import { UpdateKnowYourCustomerInput } from './dto/update-know-your-customer.input';

@Resolver(() => KnowYourCustomerEntity)
export class KnowYourCustomerResolver {
  constructor(private readonly knowYourCustomerService: KnowYourCustomerService) {}

  @Mutation(() => KnowYourCustomerEntity)
  createKnowYourCustomer(@Args('createKnowYourCustomerInput') createKnowYourCustomerInput: CreateKnowYourCustomerInput) {
    return this.knowYourCustomerService.create(createKnowYourCustomerInput);
  }

  @Query(() => [KnowYourCustomerEntity], { name: 'knowYourCustomer' })
  findAll() {
    return this.knowYourCustomerService.findAll();
  }

  @Query(() => KnowYourCustomerEntity, { name: 'knowYourCustomer' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.knowYourCustomerService.findOne(id);
  }

  @Mutation(() => KnowYourCustomerEntity)
  updateKnowYourCustomer(@Args('updateKnowYourCustomerInput') updateKnowYourCustomerInput: UpdateKnowYourCustomerInput) {
    return this.knowYourCustomerService.update(updateKnowYourCustomerInput.id, updateKnowYourCustomerInput);
  }

  @Mutation(() => KnowYourCustomerEntity)
  removeKnowYourCustomer(@Args('id', { type: () => Int }) id: number) {
    return this.knowYourCustomerService.remove(id);
  }
}
