import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FreelanceServiceService } from './freelance-service.service';
import { FreelanceServiceEntity } from './entities/freelance-service.entity';
import { CreateFreelanceServiceInput } from './dto/create-freelance-service.input';
import { UpdateFreelanceServiceInput } from './dto/update-freelance-service.input';

@Resolver(() => FreelanceServiceEntity)
export class FreelanceServiceResolver {
  constructor(private readonly freelanceServiceService: FreelanceServiceService) {}
}
