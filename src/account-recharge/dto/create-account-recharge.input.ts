import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountRechargeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
