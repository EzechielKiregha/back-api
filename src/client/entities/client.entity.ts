import { ObjectType, Field } from '@nestjs/graphql';
import { AccountRechargeEntity } from 'src/account-recharge/entities/account-recharge.entity';
import { ChatEntity } from 'src/chat/entities/chat.entity';
import { FreelanceOrderEntity } from 'src/freelance-order/entities/freelance-order.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ReferralEntity } from 'src/referral/entities/referral.entity';
import { ReviewEntity } from 'src/review/entities/review.entity';
@ObjectType()
export class ClientEntity {
  @Field()
  id: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  // Password is not exposed in GraphQL schema for security
  @Field()
  isVerified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations (simplified for GraphQL, actual types depend on other modules)
  @Field(() => [ObjectType()], { nullable: true })
  orders?: any[];

  @Field(() => [ObjectType()], { nullable: true })
  reviews?: any[];

  @Field(() => [ObjectType()], { nullable: true })
  chats?: any[];

  @Field(() => [ObjectType()], { nullable: true })
  recharges?: any[];

  @Field(() => [ObjectType()], { nullable: true })
  freelanceOrders?: any[];

  @Field(() => [ObjectType()], { nullable: true })
  referralsMade?: any[];

  @Field(() => [ObjectType()], { nullable: true })
  referralsReceived?: any[];
}