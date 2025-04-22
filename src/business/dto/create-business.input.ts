import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateBusinessInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
