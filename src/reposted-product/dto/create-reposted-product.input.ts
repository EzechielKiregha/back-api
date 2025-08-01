import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNumber, IsString, Min } from 'class-validator';

// DTOs
@InputType()
export class CreateRepostedProductInput {
  @Field()
  @IsString()
  productId: string;

  @Field()
  @IsString()
  businessId: string;

  @Field(() => Float, { defaultValue: 0.002 })
  @IsNumber()
  @Min(0)
  earnPercentage: number;
}

