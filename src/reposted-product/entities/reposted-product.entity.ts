import { ObjectType, Field, Float } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@ObjectType()
export class RepostedProductEntity {
  @Field()
  id: string;

  @Field()
  businessId: string;

  @Field()
  productId: string;

  @Field(() => Float)
  earnPercentage: number;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => BusinessEntity) // Business associated with the reposted product
  business: BusinessEntity;

  @Field(() => ProductEntity) // Product being reposted
  product: ProductEntity;
}
