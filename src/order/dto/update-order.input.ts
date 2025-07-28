import { IsOptional, IsString } from 'class-validator';
import { CreateOrderInput } from './create-order.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  qrCode?: string;
}
