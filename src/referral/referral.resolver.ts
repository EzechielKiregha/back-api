import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReferralService } from './referral.service';
import { ReferralEntity } from './entities/referral.entity';
import { CreateReferralInput } from './dto/create-referral.input';
import { UpdateReferralInput } from './dto/update-referral.input';

@Resolver(() => ReferralEntity)
export class ReferralResolver {
  constructor(private readonly referralService: ReferralService) {}

  @Mutation(() => ReferralEntity)
  createReferral(@Args('createReferralInput') createReferralInput: CreateReferralInput) {
    return this.referralService.create(createReferralInput);
  }

  @Query(() => [ReferralEntity], { name: 'referral' })
  findAll() {
    return this.referralService.findAll();
  }

  @Query(() => ReferralEntity, { name: 'referral' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.referralService.findOne(id);
  }

  @Mutation(() => ReferralEntity)
  updateReferral(@Args('updateReferralInput') updateReferralInput: UpdateReferralInput) {
    return this.referralService.update(updateReferralInput.id, updateReferralInput);
  }

  @Mutation(() => ReferralEntity)
  removeReferral(@Args('id', { type: () => Int }) id: number) {
    return this.referralService.remove(id);
  }
}
