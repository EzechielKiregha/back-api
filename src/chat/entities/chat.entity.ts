import { ObjectType, Field } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ChatMessageEntity } from 'src/chat-nessage/entities/chat-nessage.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { WorkerEntity } from 'src/worker/entities/worker.entity';

@ObjectType()
export class ChatEntity {
  @Field()
  id: string;

  @Field()
  clientId: string;

  @Field()
  productId: string;

  @Field({ nullable: true })
  businessId?: string;

  @Field({ nullable: true })
  workerId?: string;

  @Field()
  status: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => ClientEntity) // Client associated with the chat
  client: ClientEntity;

  @Field(() => ProductEntity) // Product associated with the chat
  product: ProductEntity;

  @Field(() => BusinessEntity, { nullable: true }) // Business associated with the chat
  business: BusinessEntity;

  @Field(() => WorkerEntity, { nullable: true }) // Worker associated with the chat
  worker: WorkerEntity;

  @Field(() => [ChatMessageEntity]) // Messages in the chat
  messages: ChatMessageEntity[];
}
