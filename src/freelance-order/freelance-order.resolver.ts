import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FreelanceOrderService } from './freelance-order.service';
import { FreelanceOrderEntity } from './entities/freelance-order.entity';
import { CreateFreelanceOrderInput } from './dto/create-freelance-order.input';
import { UpdateFreelanceOrderInput } from './dto/update-freelance-order.input';

@Resolver(() => FreelanceOrderEntity)
export class FreelanceOrderResolver {
  constructor(private readonly freelanceOrderService: FreelanceOrderService) {}

  @Mutation(() => FreelanceOrderEntity)
  createFreelanceOrder(@Args('createFreelanceOrderInput') createFreelanceOrderInput: CreateFreelanceOrderInput) {
    return this.freelanceOrderService.create(createFreelanceOrderInput);
  }

  @Query(() => [FreelanceOrderEntity], { name: 'freelanceOrder' })
  findAll() {
    return this.freelanceOrderService.findAll();
  }

  @Query(() => FreelanceOrderEntity, { name: 'freelanceOrder' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.freelanceOrderService.findOne(id);
  }

  @Mutation(() => FreelanceOrderEntity)
  updateFreelanceOrder(@Args('updateFreelanceOrderInput') updateFreelanceOrderInput: UpdateFreelanceOrderInput) {
    return this.freelanceOrderService.update(updateFreelanceOrderInput.id, updateFreelanceOrderInput);
  }

  @Mutation(() => FreelanceOrderEntity)
  removeFreelanceOrder(@Args('id', { type: () => Int }) id: number) {
    return this.freelanceOrderService.remove(id);
  }
}
