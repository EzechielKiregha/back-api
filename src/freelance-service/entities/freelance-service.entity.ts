import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { FreelanceOrderEntity } from 'src/freelance-order/entities/freelance-order.entity';

@ObjectType()
export class FreelanceServiceEntity {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  isHourly: boolean;

  @Field(() => Float)
  rate: number; // Rate per hour or fixed

  @Field()
  businessId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => BusinessEntity) // Business offering the freelance service
  business: BusinessEntity;

  @Field(() => [FreelanceOrderEntity]) // Orders associated with the freelance service
  orders: FreelanceOrderEntity[];
}
