import { Resolver, Query, Mutation, Args, Int, Context, Float } from '@nestjs/graphql';
import { AccountRechargeService } from './account-recharge.service';
import { AccountRechargeEntity } from './entities/account-recharge.entity';
import { CreateAccountRechargeInput } from './dto/create-account-recharge.input';
import { UpdateAccountRechargeInput } from './dto/update-account-recharge.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

// Resolver
@Resolver(() => AccountRechargeEntity)
export class AccountRechargeResolver {
  constructor(
    private readonly accountRechargeService: AccountRechargeService,
    private readonly prisma: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Mutation(() => AccountRechargeEntity, { description: 'Creates a new account recharge.' })
  async createAccountRecharge(
    @Args('createAccountRechargeInput') createAccountRechargeInput: CreateAccountRechargeInput,
    @Context() context,
  ) {
    const user = context.req.user;
    return this.accountRechargeService.create(createAccountRechargeInput, user.id, user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Query(() => Float, { name: 'accountBalance', description: 'Retrieves the total recharge balance for the user.' })
  async getAccountBalance(@Context() context) {
    const user = context.req.user;
    return this.accountRechargeService.getBalance(user.id, user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Query(() => [AccountRechargeEntity], { name: 'accountRecharges', description: 'Retrieves account recharges for the user.' })
  async getAccountRecharges(@Context() context) {
    const user = context.req.user;
    return this.prisma.accountRecharge.findMany({
      where: {
        OR: [
          { clientId: user.role === 'client' ? user.id : undefined },
          { businessId: user.role === 'business' ? user.id : undefined },
        ],
      },
      include: {
        client: { select: { id: true, username: true, email: true, createdAt: true } },
        business: { select: { id: true, name: true, email: true, createdAt: true } },
      },
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Query(() => AccountRechargeEntity, { name: 'accountRecharge', description: 'Retrieves a single account recharge by ID.' })
  async getAccountRecharge(@Args('id', { type: () => String }) id: string, @Context() context) {
    const user = context.req.user;
    const recharge = await this.accountRechargeService.findOne(id);
    if (!recharge) {
      throw new Error('Account recharge not found');
    }
    if (user.role === 'client' && recharge.clientId !== user.id) {
      throw new Error('Clients can only access their own recharges');
    }
    if (user.role === 'business' && recharge.businessId !== user.id) {
      throw new Error('Businesses can only access their own recharges');
    }
    return recharge;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Mutation(() => AccountRechargeEntity, { description: 'Updates an account recharge.' })
  async updateAccountRecharge(
    @Args('id', { type: () => String }) id: string,
    @Args('updateAccountRechargeInput') updateAccountRechargeInput: UpdateAccountRechargeInput,
    @Context() context,
  ) {
    const user = context.req.user;
    return this.accountRechargeService.update(id, updateAccountRechargeInput, user.id, user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Mutation(() => AccountRechargeEntity, { description: 'Deletes an account recharge.' })
  async deleteAccountRecharge(@Args('id', { type: () => String }) id: string, @Context() context) {
    const user = context.req.user;
    return this.accountRechargeService.remove(id, user.id, user.role);
  }
}
