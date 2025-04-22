import { ObjectType, Field, Float } from '@nestjs/graphql';
import { OrderEntity } from 'src/order/entities/order.entity';

@ObjectType()
export class PaymentTransactionEntity {
  @Field()
  id: string;

  @Field()
  orderId: string;

  @Field()
  status: string; // PaymentStatus (e.g., PENDING, COMPLETED, FAILED)

  @Field()
  method: string; // PaymentMethod (e.g., TOKEN, MOBILE_MONEY)

  @Field(() => Float)
  amount: number;

  @Field()
  transactionDate: Date;

  @Field({ nullable: true })
  qrCode?: string;

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => OrderEntity) // Order associated with the payment transaction
  order: OrderEntity;
}
