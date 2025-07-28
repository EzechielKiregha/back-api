import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';

// Resolver
@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private readonly orderService: OrderService, private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client')
  @Mutation(() => OrderEntity, { description: 'Creates a new order for a client.' })
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @Context() context,
  ) {
    const user = context.req.user;
    if (user.role === 'client' && user.id !== createOrderInput.clientId) {
      throw new Error('Clients can only create orders for their own account');
    }
    return this.orderService.create(createOrderInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Query(() => [OrderEntity], { name: 'orders', description: 'Retrieves orders based on user role.' })
  async getOrders(@Context() context) {
    const user = context.req.user;
    if (user.role === 'client') {
      return this.prisma.order.findMany({
        where: { clientId: user.id },
        include: {
          client: { select: { id: true, username: true, email: true, createdAt: true } },
          payment: { select: { id: true, amount: true, method: true, status: true, transactionDate: true, qrCode: true, createdAt: true } },
          products: { select: { id: true, quantity: true, createdAt: true, product: { select: { id: true, title: true, price: true, stock: true, createdAt: true } } } },
        },
      });
    }
    if (user.role === 'business') {
      return this.prisma.order.findMany({
        where: {
          products: {
            some: {
              product: { businessId: user.id },
            },
          },
        },
        include: {
          client: { select: { id: true, username: true, email: true, createdAt: true } },
          payment: { select: { id: true, amount: true, method: true, status: true, transactionDate: true, qrCode: true, createdAt: true } },
          products: { select: { id: true, quantity: true, createdAt: true, product: { select: { id: true, title: true, price: true, stock: true, createdAt: true } } } },
        },
      });
    }
    throw new Error('Unauthorized role');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'business')
  @Query(() => OrderEntity, { name: 'order', description: 'Retrieves a single order by ID.' })
  async getOrder(@Args('id', { type: () => String }) id: string, @Context() context) {
    const user = context.req.user;
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }
    if (user.role === 'client' && user.id !== order.client.id) {
      throw new Error('Clients can only access their own orders');
    }
    if (user.role === 'business' && !order.products.some(item => item.product.businessId === user.id)) {
      throw new Error('Businesses can only access orders containing their products');
    }
    return order;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client')
  @Mutation(() => OrderEntity, { description: 'Updates an order’s details.' })
  async updateOrder(
    @Args('id', { type: () => String }) id: string,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
    @Context() context,
  ) {
    const user = context.req.user;
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }
    if (user.id !== order.client.id) {
      throw new Error('Clients can only update their own orders');
    }

    if (!updateOrderInput) return BadRequestException

    return this.orderService.update(id, updateOrderInput);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client')
  @Mutation(() => OrderEntity, { description: 'Deletes an order.' })
  async deleteOrder(@Args('id', { type: () => String }) id: string, @Context() context) {
    const user = context.req.user;
    const order = await this.orderService.findOne(id);
    if (!order) {
      throw new Error('Order not found');
    }
    if (user.id !== order.client.id) {
      throw new Error('Clients can only delete their own orders');
    }
    return this.orderService.remove(id);
  }
}

