import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { BusinessEntity } from 'src/business/entities/business.entity';
import { ClientEntity } from 'src/client/entities/client.entity';
import { FreelanceServiceEntity } from 'src/freelance-service/entities/freelance-service.entity';

@ObjectType()
export class FreelanceOrderEntity {
  @Field()
  id: string;

  @Field()
  clientId: string;

  @Field()
  serviceId: string;

  @Field()
  status: string; // FreelanceStatus (e.g., PENDING, IN_PROGRESS, COMPLETED, CANCELLED)

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  totalAmount: number;

  @Field(() => Float)
  escrowAmount: number;

  @Field(() => Float)
  commissionPercent: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => ClientEntity) // Client who placed the freelance order
  client: ClientEntity;

  @Field(() => FreelanceServiceEntity) // Freelance service associated with the order
  service: FreelanceServiceEntity;

  @Field(() => [BusinessEntity]) // Businesses associated with the freelance order
  businesses: BusinessEntity[];
}
