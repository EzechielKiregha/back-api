import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString, Min } from 'class-validator';

// DTOs
@InputType()
export class CreateReOwnedProductInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsString()
  requestingBusinessId: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  newPrice: number;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  markupPercentage: number;
}

@InputType()
export class ApproveReOwnedProductInput {
  @Field()
  @IsString()
  reOwnedProductId: string;

  @Field()
  @IsString()
  chatId: string;

  @Field(() => Boolean)
  @IsBoolean()
  isApproved: boolean;
}

