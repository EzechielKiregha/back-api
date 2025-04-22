import { CreateFreelanceOrderInput } from './create-freelance-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFreelanceOrderInput extends PartialType(CreateFreelanceOrderInput) {
  @Field(() => Int)
  id: number;
}
