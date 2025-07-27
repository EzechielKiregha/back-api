import { IsOptional, IsString } from 'class-validator';
import { CreateBusinessInput } from './create-business.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBusinessInput extends PartialType(CreateBusinessInput) {
  @Field(() => Int)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  kycId?: string;
}
