import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PaymentTransactionResolver } from './payment-transaction.resolver';
import { PaymentTransactionService } from './payment-transaction.service';
import { AccountRechargeService } from 'src/account-recharge/account-recharge.service';

@Module({
  providers: [PaymentTransactionResolver, PaymentTransactionService, PrismaService, AccountRechargeService],
})
export class PaymentTransactionModule {}