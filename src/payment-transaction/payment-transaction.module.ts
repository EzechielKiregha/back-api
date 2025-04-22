import { Module } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionResolver } from './payment-transaction.resolver';

@Module({
  providers: [PaymentTransactionResolver, PaymentTransactionService],
})
export class PaymentTransactionModule {}
