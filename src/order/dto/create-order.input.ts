import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { ArrayMinSize, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreatePaymentTransactionInput } from 'src/payment-transaction/dto/create-payment-transaction.input';

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  clientId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  deliveryFee: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  qrCode?: string;

  @Field(() => [CreateOrderProductInput])
  @ArrayMinSize(1)
  orderProducts: CreateOrderProductInput[];

  @Field(() => CreatePaymentTransactionInput)
  payment: CreatePaymentTransactionInput;
}

@InputType()
export class CreateOrderProductInput {
  @Field()
  @IsString()
  productId: string;

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  quantity: number;
}


