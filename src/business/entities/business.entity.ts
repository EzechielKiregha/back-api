import { ObjectType, Field } from '@nestjs/graphql';
import { AccountRechargeEntity } from 'src/account-recharge/entities/account-recharge.entity';
import { AdEntity } from 'src/ad/entities/ad.entity';
import { ChatEntity } from 'src/chat/entities/chat.entity';
import { FreelanceOrderEntity } from 'src/freelance-order/entities/freelance-order.entity';
import { FreelanceServiceEntity } from 'src/freelance-service/entities/freelance-service.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ReOwnedProductEntity } from 'src/re-owned-product/entities/re-owned-product.entity';
import { ReferralEntity } from 'src/referral/entities/referral.entity';
import { RepostedProductEntity } from 'src/reposted-product/entities/reposted-product.entity';
import { WorkerEntity } from 'src/worker/entities/worker.entity';

@ObjectType()
export class BusinessEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  isVerified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations
  @Field(() => [ProductEntity]) // Products associated with the business
  products: ProductEntity[];

  @Field(() => [WorkerEntity]) // Workers associated with the business
  workers: WorkerEntity[];

  @Field(() => [RepostedProductEntity]) // Reposted products
  repostedItems: RepostedProductEntity[];

  @Field(() => [ReOwnedProductEntity]) // Reowned products
  reownedItems: ReOwnedProductEntity[];

  @Field(() => [AccountRechargeEntity]) // Recharges made by the business
  recharges: AccountRechargeEntity[];

  @Field(() => [AdEntity]) // Ads created by the business
  ads: AdEntity[];

  @Field(() => [FreelanceServiceEntity]) // Freelance services offered by the business
  freelanceServices: FreelanceServiceEntity[];

  @Field(() => [FreelanceOrderEntity]) // Freelance orders associated with the business
  freelanceOrders: FreelanceOrderEntity[];

  @Field(() => [ReferralEntity]) // Referrals made by the business
  referralsMade: ReferralEntity[];

  @Field(() => [ReferralEntity]) // Referrals received by the business
  referralsReceived: ReferralEntity[];

  @Field(() => [ChatEntity]) // Chats associated with the business
  chats: ChatEntity[];
}
