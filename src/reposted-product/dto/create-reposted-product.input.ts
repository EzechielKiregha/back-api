import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRepostedProductInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
