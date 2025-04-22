import { CreateFreelanceServiceInput } from './create-freelance-service.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFreelanceServiceInput extends PartialType(CreateFreelanceServiceInput) {
  @Field(() => Int)
  id: number;
}
