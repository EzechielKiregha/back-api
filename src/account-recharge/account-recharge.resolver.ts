import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountRechargeService } from './account-recharge.service';
import { AccountRechargeEntity } from './entities/account-recharge.entity';
import { CreateAccountRechargeInput } from './dto/create-account-recharge.input';
import { UpdateAccountRechargeInput } from './dto/update-account-recharge.input';

@Resolver(() => AccountRechargeEntity)
export class AccountRechargeResolver {
  constructor(private readonly accountRechargeService: AccountRechargeService) {}
}
