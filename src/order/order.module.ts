import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

// Module
@Module({
  providers: [OrderResolver, OrderService, PrismaService],
})
export class OrderModule {}
