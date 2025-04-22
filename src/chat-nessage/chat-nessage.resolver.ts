import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ChatNessageService } from './chat-nessage.service';
import { ChatMessageEntity } from './entities/chat-nessage.entity';
import { CreateChatNessageInput } from './dto/create-chat-nessage.input';
import { UpdateChatNessageInput } from './dto/update-chat-nessage.input';

@Resolver(() => ChatMessageEntity)
export class ChatNessageResolver {
  constructor(private readonly chatNessageService: ChatNessageService) {}

  @Mutation(() => ChatMessageEntity)
  createChatNessage(@Args('createChatNessageInput') createChatNessageInput: CreateChatNessageInput) {
    return this.chatNessageService.create(createChatNessageInput);
  }

  @Query(() => [ChatMessageEntity], { name: 'chatNessage' })
  findAll() {
    return this.chatNessageService.findAll();
  }

  @Query(() => ChatMessageEntity, { name: 'chatNessage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatNessageService.findOne(id);
  }

  @Mutation(() => ChatMessageEntity)
  updateChatNessage(@Args('updateChatNessageInput') updateChatNessageInput: UpdateChatNessageInput) {
    return this.chatNessageService.update(updateChatNessageInput.id, updateChatNessageInput);
  }

  @Mutation(() => ChatMessageEntity)
  removeChatNessage(@Args('id', { type: () => Int }) id: number) {
    return this.chatNessageService.remove(id);
  }
}
