import { CreateAccountRechargeInput } from './create-account-recharge.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountRechargeInput extends PartialType(CreateAccountRechargeInput) {
  @Field(() => String)
  id: string;
}
