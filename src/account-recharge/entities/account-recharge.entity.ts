import { ObjectType, Field, Float, registerEnumType } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { Country, RechargeMethod } from '../dto/create-account-recharge.input';


@ObjectType()
export class AccountRechargeEntity {
  @Field()
  id: string;

  @Field(() => Float)
  amount: number;

  @Field(() => RechargeMethod)
  method: RechargeMethod;

  @Field(() => Country)
  origin: Country;

  @Field()
  createdAt: Date;

  @Field(() => ClientEntity, { nullable: true })
  client?: ClientEntity;

  @Field(() => BusinessEntity, { nullable: true })
  business?: BusinessEntity;
}


