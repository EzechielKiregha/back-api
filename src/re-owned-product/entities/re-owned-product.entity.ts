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

  @Field()
  productId: string;

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
  createdAt: Date;

  // Relations
  @Field(() => BusinessEntity) // Business associated with the re-owned product
  business: BusinessEntity;

  @Field(() => ProductEntity) // Product being re-owned
  product: ProductEntity;

  @Field(() => ChatEntity) // Chat where the agreement was made
  agreedViaChat: ChatEntity;
}
