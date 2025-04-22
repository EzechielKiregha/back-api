import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentTransactionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
