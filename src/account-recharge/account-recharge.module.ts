import { Module } from '@nestjs/common';
import { AccountRechargeService } from './account-recharge.service';
import { AccountRechargeResolver } from './account-recharge.resolver';

@Module({
  providers: [AccountRechargeResolver, AccountRechargeService],
})
export class AccountRechargeModule {}
