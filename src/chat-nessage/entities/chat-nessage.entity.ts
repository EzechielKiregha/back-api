import { ObjectType, Field } from '@nestjs/graphql';
import { ChatEntity } from 'src/chat/entities/chat.entity';

@ObjectType()
export class ChatMessageEntity {
  @Field()
  id: string;

  @Field()
  chatId: string;

  @Field()
  message: string;

  @Field({ nullable: true })
  senderId?: string; // ID of the sender (business or client)

  @Field()
  createdAt: Date;

  // Relations
  @Field(() => ChatEntity) // Chat associated with the message
  chat: ChatEntity;
}
