import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionEntity } from './entities/payment-transaction.entity';
import { CreatePaymentTransactionInput } from './dto/create-payment-transaction.input';
import { UpdatePaymentTransactionInput } from './dto/update-payment-transaction.input';

@Resolver(() => PaymentTransactionEntity)
export class PaymentTransactionResolver {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) {}
}
