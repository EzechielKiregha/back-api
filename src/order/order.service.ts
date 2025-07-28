import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { PrismaService } from 'src/prisma/prisma.service';
// Service
@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async create(createOrderInput: CreateOrderInput) {
    const { clientId, orderProducts, payment, ...orderData } = createOrderInput;
    return this.prisma.order.create({
      data: {
        ...orderData,
        client: { connect: { id: clientId } },
        payment: {
          create: {
            amount: payment.amount,
            method: payment.method,
            status: payment.status,
            qrCode: payment.qrCode,
          },
        },
        products: {
          create: orderProducts.map(item => ({
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
          })),
        },
      },
      select: {
        id: true,
        deliveryFee: true,
        deliveryAddress: true,
        qrCode: true,
        createdAt: true,
        updatedAt: true,
        client: { select: { id: true, username: true, email: true, createdAt: true } },
        payment: { select: { id: true, amount: true, method: true, status: true, transactionDate: true, qrCode: true, createdAt: true } },
        products: { select: { id: true, quantity: true, createdAt: true, product: { select: { id: true, businessId: true, title: true, price: true, stock: true, createdAt: true } } } },
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        client: { select: { id: true, username: true, email: true, createdAt: true } },
        payment: { select: { id: true, amount: true, method: true, status: true, transactionDate: true, qrCode: true, createdAt: true } },
        products: { select: { id: true, quantity: true, createdAt: true, product: { select: { id: true, businessId: true, title: true, price: true, stock: true, createdAt: true } } } },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, username: true, email: true, createdAt: true } },
        payment: { select: { id: true, amount: true, method: true, status: true, transactionDate: true, qrCode: true, createdAt: true } },
        products: { select: { id: true, quantity: true, createdAt: true, product: { select: { id: true, businessId: true, title: true, price: true, stock: true, createdAt: true } } } },
      },
    });
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    const { ...orderData } = updateOrderInput;
    return this.prisma.order.update({
      where: { id },
      data: {
        deliveryAddress : orderData.deliveryAddress,
        qrCode : orderData.qrCode,
        deliveryFee : orderData.deliveryFee,
      },
      select: {
        id: true,
        deliveryFee: true,
        deliveryAddress: true,
        qrCode: true,
        createdAt: true,
        updatedAt: true,
        client: { select: { id: true, username: true, email: true } },
        payment: { select: { id: true, amount: true, method: true, status: true } },
        products: { select: { id: true, quantity: true, createdAt: true, product: { select: { id: true, businessId: true, title: true } } } },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.order.delete({
      where: { id },
      select: {
        id: true,
        deliveryFee: true,
      },
    });
  }
}
