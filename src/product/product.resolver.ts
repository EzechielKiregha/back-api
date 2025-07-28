import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { NotFoundException, UseGuards } from '@nestjs/common';

// Resolver
@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Mutation(() => ProductEntity, { description: 'Creates a new product for a business.' })
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Context() context,
  ) {
    const user = context.req.user;
    if (user.role === 'business' && user.id !== createProductInput.businessId) {
      throw new Error('Businesses can only create products for their own account');
    }
    return this.productService.create(createProductInput);
  }

  @Query(() => [ProductEntity], { name: 'products', description: 'Retrieves all products with their relations.' })
  async getProducts() {
    return this.productService.findAll();
  }

  @Query(() => ProductEntity, { name: 'product', description: 'Retrieves a single product by ID.' })
  async getProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Mutation(() => ProductEntity, { description: 'Updates a product’s details.' })
  async updateProduct(
    @Args('id', { type: () => String }) id: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
    @Context() context,
  ) {
    const user = context.req.user;
    const product = await this.productService.findOne(id);

    if (!product) return new NotFoundException("No product found")

    if (user.role === 'business' && user.id !== product.business.id) {
      throw new Error('Businesses can only update their own products');
    }
    return this.productService.update(id, updateProductInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('business')
  @Mutation(() => ProductEntity, { description: 'Deletes a product.' })
  async deleteProduct(@Args('id', { type: () => String }) id: string, @Context() context) {
    const user = context.req.user;
    const product = await this.productService.findOne(id);

    if (!product) return new NotFoundException("No product found")
      
    if (user.role === 'business' && user.id !== product.business.id) {
      throw new Error('Businesses can only delete their own products');
    }
    return this.productService.remove(id);
  }
}
