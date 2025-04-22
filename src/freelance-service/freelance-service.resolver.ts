import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FreelanceServiceService } from './freelance-service.service';
import { FreelanceServiceEntity } from './entities/freelance-service.entity';
import { CreateFreelanceServiceInput } from './dto/create-freelance-service.input';
import { UpdateFreelanceServiceInput } from './dto/update-freelance-service.input';

@Resolver(() => FreelanceServiceEntity)
export class FreelanceServiceResolver {
  constructor(private readonly freelanceServiceService: FreelanceServiceService) {}

  @Mutation(() => FreelanceServiceEntity)
  createFreelanceService(@Args('createFreelanceServiceInput') createFreelanceServiceInput: CreateFreelanceServiceInput) {
    return this.freelanceServiceService.create(createFreelanceServiceInput);
  }

  @Query(() => [FreelanceServiceEntity], { name: 'freelanceService' })
  findAll() {
    return this.freelanceServiceService.findAll();
  }

  @Query(() => FreelanceServiceEntity, { name: 'freelanceService' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.freelanceServiceService.findOne(id);
  }

  @Mutation(() => FreelanceServiceEntity)
  updateFreelanceService(@Args('updateFreelanceServiceInput') updateFreelanceServiceInput: UpdateFreelanceServiceInput) {
    return this.freelanceServiceService.update(updateFreelanceServiceInput.id, updateFreelanceServiceInput);
  }

  @Mutation(() => FreelanceServiceEntity)
  removeFreelanceService(@Args('id', { type: () => Int }) id: number) {
    return this.freelanceServiceService.remove(id);
  }
}
