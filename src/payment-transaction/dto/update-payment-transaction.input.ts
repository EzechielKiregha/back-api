import { CreatePaymentTransactionInput } from './create-payment-transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentTransactionInput extends PartialType(CreatePaymentTransactionInput) {
  @Field(() => Int)
  id: number;
}
