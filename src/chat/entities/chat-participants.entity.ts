import { ObjectType, Field } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { WorkerEntity } from 'src/worker/entities/worker.entity';

@ObjectType()
export class ChatParticipantEntity {
  @Field()
  id: string;

  @Field()
  chatId: string;

  @Field({ nullable: true })
  clientId?: string;

  @Field(() => ClientEntity, { nullable: true })
  client?: ClientEntity;

  @Field({ nullable: true })
  businessId?: string;

  @Field(() => BusinessEntity, { nullable: true })
  business?: BusinessEntity;

  @Field({ nullable: true })
  workerId?: string;

  @Field(() => WorkerEntity, { nullable: true })
  worker?: WorkerEntity;

  @Field()
  createdAt: Date;
}


