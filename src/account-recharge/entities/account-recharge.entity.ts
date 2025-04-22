import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ClientEntity } from 'src/client/entities/client.entity';

@ObjectType()
export class AccountRechargeEntity {
  @Field()
  id: string;

  @Field(() => Float)
  amount: number;

  @Field()
  method: string; // RechargeMethod (e.g., MTN_MONEY, AIRTEL_MONEY)

  @Field()
  origin: string; // Country (e.g., DRC, KENYA)

  @Field({ nullable: true })
  businessId?: string;

  @Field({ nullable: true })
  clientId?: string;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => BusinessEntity, { nullable: true }) // Business associated with the recharge
  business: BusinessEntity;

  @Field(() => ClientEntity, { nullable: true }) // Client associated with the recharge
  client: ClientEntity;
}
