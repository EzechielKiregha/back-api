import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FreelanceOrderService } from './freelance-order.service';
import { FreelanceOrderEntity } from './entities/freelance-order.entity';
import { CreateFreelanceOrderInput } from './dto/create-freelance-order.input';
import { UpdateFreelanceOrderInput } from './dto/update-freelance-order.input';

@Resolver(() => FreelanceOrderEntity)
export class FreelanceOrderResolver {
  constructor(private readonly freelanceOrderService: FreelanceOrderService) {}
}
