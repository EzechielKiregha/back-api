import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFreelanceServiceInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
