import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReferralService } from './referral.service';
import { ReferralEntity } from './entities/referral.entity';
import { CreateReferralInput } from './dto/create-referral.input';
import { UpdateReferralInput } from './dto/update-referral.input';

@Resolver(() => ReferralEntity)
export class ReferralResolver {
  constructor(private readonly referralService: ReferralService) {}
}
