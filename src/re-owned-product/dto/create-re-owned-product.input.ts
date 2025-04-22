import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateReOwnedProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
