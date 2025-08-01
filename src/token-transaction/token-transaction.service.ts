import { Injectable } from '@nestjs/common';
import { CreateTokenTransactionInput } from './dto/create-token-transaction.input';
import { UpdateTokenTransactionInput } from './dto/update-token-transaction.input';
import { PrismaService } from 'src/prisma/prisma.service';

// Service
@Injectable()
export class TokenTransactionService {
  constructor(private prisma: PrismaService) {}

  async create(createTokenTransactionInput: CreateTokenTransactionInput) {
    const { businessId, reOwnedProductId, amount, type } = createTokenTransactionInput;

    const business = await this.prisma.business.findUnique({ where: { id: businessId } });
    if (!business) {
      throw new Error('Business not found');
    }

    if (reOwnedProductId) {
      const reOwnedProduct = await this.prisma.reOwnedProduct.findUnique({ where: { id: reOwnedProductId } });
      if (!reOwnedProduct) {
        throw new Error('ReOwnedProduct not found');
      }
    }

    return this.prisma.tokenTransaction.create({
      data: {
        business: { connect: { id: businessId } },
        reOwnedProduct: reOwnedProductId ? { connect: { id: reOwnedProductId } } : undefined,
        amount,
        type,
      },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        reOwnedProduct: reOwnedProductId ? { select: { id: true, newProductId: true, originalProductId: true, oldOwnerId: true, newOwnerId: true, quantity: true, oldPrice: true, newPrice: true, createdAt: true } } : false,
      },
    });
  }

  async findAll(businessId: string) {
    return this.prisma.tokenTransaction.findMany({
      where: { businessId },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        reOwnedProduct: { select: { id: true, newProductId: true, originalProductId: true, oldOwnerId: true, newOwnerId: true, quantity: true, oldPrice: true, newPrice: true, createdAt: true } },
      },
    });
  }

  async findOne(id: string, businessId: string) {
    const tokenTransaction = await this.prisma.tokenTransaction.findUnique({
      where: { id },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        reOwnedProduct: { select: { id: true, newProductId: true, originalProductId: true, oldOwnerId: true, newOwnerId: true, quantity: true, oldPrice: true, newPrice: true, createdAt: true } },
      },
    });
    if (!tokenTransaction) {
      throw new Error('TokenTransaction not found');
    }
    if (tokenTransaction.businessId !== businessId) {
      throw new Error('Access restricted to the associated business');
    }
    return tokenTransaction;
  }
}

