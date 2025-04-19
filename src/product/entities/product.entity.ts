import {
  ObjectType,
  Field,
  Float,
} from '@nestjs/graphql'

@ObjectType()
export class Product {
  @Field(() => String)
  id: string

  @Field(() => String)
  userId: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Float, { nullable: true })
  price?: number

  @Field(() => String, { nullable: true })
  category?: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Boolean)
  isPublished: boolean

  @Field(() => Boolean)
  isFeatured: boolean

  @Field(() => String)
  approvedForSale: string

  @Field(() => String, { nullable: true })
  stripeId?: string

  @Field(() => String, { nullable: true })
  priceId?: string

  // Add relations if needed
  // @Field(() => [Image], { nullable: true })
  // images?: Image[];

  // @Field(() => [ProductFile], { nullable: true })
  // productFiles?: ProductFile[];

  // @Field(() => [Order], { nullable: true })
  // orders?: Order[];

  // @Field(() => [ProductReview], { nullable: true })
  // reviews?: ProductReview[];
}
