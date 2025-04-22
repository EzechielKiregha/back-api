import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionEntity } from './entities/payment-transaction.entity';
import { CreatePaymentTransactionInput } from './dto/create-payment-transaction.input';
import { UpdatePaymentTransactionInput } from './dto/update-payment-transaction.input';

@Resolver(() => PaymentTransactionEntity)
export class PaymentTransactionResolver {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) {}

  @Mutation(() => PaymentTransactionEntity)
  createPaymentTransaction(@Args('createPaymentTransactionInput') createPaymentTransactionInput: CreatePaymentTransactionInput) {
    return this.paymentTransactionService.create(createPaymentTransactionInput);
  }

  @Query(() => [PaymentTransactionEntity], { name: 'paymentTransaction' })
  findAll() {
    return this.paymentTransactionService.findAll();
  }

  @Query(() => PaymentTransactionEntity, { name: 'paymentTransaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.paymentTransactionService.findOne(id);
  }

  @Mutation(() => PaymentTransactionEntity)
  updatePaymentTransaction(@Args('updatePaymentTransactionInput') updatePaymentTransactionInput: UpdatePaymentTransactionInput) {
    return this.paymentTransactionService.update(updatePaymentTransactionInput.id, updatePaymentTransactionInput);
  }

  @Mutation(() => PaymentTransactionEntity)
  removePaymentTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.paymentTransactionService.remove(id);
  }
}
