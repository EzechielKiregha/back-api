import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ReOwnedProductService } from './re-owned-product.service';
import { ReOwnedProductEntity } from './entities/re-owned-product.entity';
import { ApproveReOwnedProductInput, CreateReOwnedProductInput } from './dto/create-re-owned-product.input';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Resolver
@Resolver(() => ReOwnedProductEntity)
export class ReOwnedProductResolver {
  constructor(
    private readonly reOwnedProductService: ReOwnedProductService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Mutation(() => ReOwnedProductEntity, { description: 'Initiates a re-ownership request.' })
  async createReOwnedProduct(
    @Args('createReOwnedProductInput') createReOwnedProductInput: CreateReOwnedProductInput,
    @Context() context,
  ) {
    const user = context.req.user;
    if (user.id !== createReOwnedProductInput.requestingBusinessId) {
      throw new Error('Businesses can only request re-ownership for themselves');
    }
    return this.reOwnedProductService.create(createReOwnedProductInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Mutation(() => ReOwnedProductEntity, { description: 'Approves or rejects a re-ownership request.' })
  async approveReOwnedProduct(
    @Args('approveReOwnedProductInput') approveReOwnedProductInput: ApproveReOwnedProductInput,
    @Context() context,
  ) {
    const user = context.req.user;
    return this.reOwnedProductService.approve(approveReOwnedProductInput, user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Query(() => [ReOwnedProductEntity], { name: 'reOwnedProducts', description: 'Retrieves re-owned products for a business.' })
  async getReOwnedProducts(@Context() context) {
    const user = context.req.user;
    return this.reOwnedProductService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Query(() => ReOwnedProductEntity, { name: 'reOwnedProduct', description: 'Retrieves a single re-owned product by ID.' })
  async getReOwnedProduct(@Args('id', { type: () => String }) id: string, @Context() context) {
    const user = context.req.user;
    return this.reOwnedProductService.findOne(id, user.id);
  }
}

