import { ObjectType, Field } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ChatEntity } from 'src/chat/entities/chat.entity';

@ObjectType()
export class WorkerEntity {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  businessId: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => BusinessEntity) // Business associated with the worker
  business: BusinessEntity;

  @Field(() => [ChatEntity]) // Chats associated with the worker
  chats: ChatEntity[];
}
