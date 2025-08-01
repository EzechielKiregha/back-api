import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ChatEntity } from 'src/chat/entities/chat.entity';
import { ProductEntity } from 'src/product/entities/product.entity';



@ObjectType()
export class ReOwnedProductEntity {
  @Field()
  id: string;

  @Field()
  businessId: string;

  @Field(() => BusinessEntity)
  business: BusinessEntity;

  @Field()
  productId: string;

  @Field(() => ProductEntity)
  product: ProductEntity;

  @Field()
  oldOwnerId: string;

  @Field(() => Float)
  oldPrice: number;

  @Field(() => Float)
  newPrice: number;

  @Field(() => Float)
  markupPercentage: number;

  @Field()
  agreedViaChatId: string;

  @Field()
  agreementDate: Date;

  @Field(() => Boolean)
  isApproved: boolean;

  @Field()
  createdAt: Date;
}
