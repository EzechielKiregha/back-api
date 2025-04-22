import { ObjectType, Field, Float } from '@nestjs/graphql';
import { ClientEntity } from 'src/client/entities/client.entity';
import { OrderProductEntity } from 'src/order-product/entities/order-product.entity';
import { PaymentTransactionEntity } from 'src/payment-transaction/entities/payment-transaction.entity';

@ObjectType()
export class OrderEntity {
  @Field()
  id: string;

  @Field()
  clientId: string;

  @Field(() => Float)
  deliveryFee: number;

  @Field({ nullable: true })
  deliveryAddress?: string;

  @Field({ nullable: true })
  qrCode?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => ClientEntity) // Client who placed the order
  client: ClientEntity;

  @Field(() => [OrderProductEntity]) // Products in the order
  products: OrderProductEntity[];

  @Field(() => PaymentTransactionEntity, { nullable: true }) // Payment transaction for the order
  payment: PaymentTransactionEntity;
}
