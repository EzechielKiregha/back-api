import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountRechargeService } from './account-recharge.service';
import { AccountRechargeEntity } from './entities/account-recharge.entity';
import { CreateAccountRechargeInput } from './dto/create-account-recharge.input';
import { UpdateAccountRechargeInput } from './dto/update-account-recharge.input';

@Resolver(() => AccountRechargeEntity)
export class AccountRechargeResolver {
  constructor(private readonly accountRechargeService: AccountRechargeService) {}

  @Mutation(() => AccountRechargeEntity)
  createAccountRecharge(@Args('createAccountRechargeInput') createAccountRechargeInput: CreateAccountRechargeInput) {
    return this.accountRechargeService.create(createAccountRechargeInput);
  }

  @Query(() => [AccountRechargeEntity], { name: 'accountRecharge' })
  findAll() {
    return this.accountRechargeService.findAll();
  }

  @Query(() => AccountRechargeEntity, { name: 'accountRecharge' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accountRechargeService.findOne(id);
  }

  @Mutation(() => AccountRechargeEntity)
  updateAccountRecharge(@Args('updateAccountRechargeInput') updateAccountRechargeInput: UpdateAccountRechargeInput) {
    return this.accountRechargeService.update(updateAccountRechargeInput.id, updateAccountRechargeInput);
  }

  @Mutation(() => AccountRechargeEntity)
  removeAccountRecharge(@Args('id', { type: () => Int }) id: number) {
    return this.accountRechargeService.remove(id);
  }
}
