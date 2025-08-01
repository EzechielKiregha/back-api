import { CreateTokenTransactionInput } from './create-token-transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTokenTransactionInput extends PartialType(CreateTokenTransactionInput) {
  @Field(() => Int)
  id: number;
}
