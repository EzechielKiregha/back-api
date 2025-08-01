import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { TokenTransactionType } from '../dto/create-token-transaction.input';
import { ReOwnedProductEntity } from 'src/re-owned-product/entities/re-owned-product.entity';
import { BusinessEntity } from 'src/business/entities/business.entity';


@ObjectType()
export class TokenTransactionEntity {
  @Field()
  id: string;

  @Field()
  businessId: string;

  @Field(() => BusinessEntity)
  business: BusinessEntity;

  @Field({ nullable: true })
  reOwnedProductId?: string;

  @Field(() => ReOwnedProductEntity, { nullable: true })
  reOwnedProduct?: ReOwnedProductEntity;

  @Field(() => Float)
  amount: number;

  @Field(() => TokenTransactionType)
  type: TokenTransactionType;

  @Field()
  createdAt: Date;
}
