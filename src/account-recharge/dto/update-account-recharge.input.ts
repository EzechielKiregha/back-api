import { CreateAccountRechargeInput } from './create-account-recharge.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountRechargeInput extends PartialType(CreateAccountRechargeInput) {
  @Field(() => Int)
  id: number;
}
