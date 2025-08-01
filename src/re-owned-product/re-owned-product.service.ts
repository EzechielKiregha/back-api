import { Injectable } from '@nestjs/common';
import { ApproveReOwnedProductInput, CreateReOwnedProductInput } from './dto/create-re-owned-product.input';
import { UpdateReOwnedProductInput } from './dto/update-re-owned-product.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatService } from 'src/chat/chat.service';
import { NegotiationType } from 'src/chat/dto/create-chat.input';

// Service
@Injectable()
export class ReOwnedProductService {
  constructor(
    private prisma: PrismaService,
    private chatService: ChatService,
  ) {}

  async checkBusinessEligibility(businessId: string): Promise<boolean> {
    const business = await this.prisma.business.findUnique({
      where: { id: businessId },
      select: { kycStatus: true, isB2BEnabled: true, totalProductsSold: true, hasAgreedToTerms: true },
    });
    if (!business) {
      throw new Error('Business not found');
    }
    return (
      business.kycStatus === 'VERIFIED' &&
      business.isB2BEnabled &&
      business.totalProductsSold >= 100 &&
      business.hasAgreedToTerms
    );
  }

  async create(createReOwnedProductInput: CreateReOwnedProductInput) {
    const { productId, requestingBusinessId, newPrice, markupPercentage } = createReOwnedProductInput;

    // Check eligibility of requesting business
    const isEligible = await this.checkBusinessEligibility(requestingBusinessId);
    if (!isEligible) {
      throw new Error('Requesting business is not eligible for re-ownership');
    }

    // Fetch product and its owner
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: { business: { select: { id: true, kycStatus: true, isB2BEnabled: true, totalProductsSold: true, hasAgreedToTerms: true } } },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    // Check eligibility of original business
    const isOriginalEligible = await this.checkBusinessEligibility(product.businessId);
    if (!isOriginalEligible) {
      throw new Error('Original business is not eligible for re-ownership');
    }

    // Create secure chat for negotiation
    const chat = await this.chatService.create({
      productId,
      participantIds: [product.businessId, requestingBusinessId],
      isSecure: true,
      negotiationType: NegotiationType.REOWNERSHIP,
    });

    // Create ReOwnedProduct record (pending approval)
    return this.prisma.reOwnedProduct.create({
      data: {
        business: { connect: { id: requestingBusinessId } },
        product: { connect: { id: productId } },
        oldOwnerId: product.businessId,
        oldPrice: product.price,
        newPrice,
        markupPercentage,
        agreedViaChatId: chat.id,
        agreementDate: new Date(),
        isApproved: false,
      },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        product: { select: { id: true, title: true, price: true, businessId: true } },
      },
    });
  }

  async approve(approveReOwnedProductInput: ApproveReOwnedProductInput, approvingBusinessId: string) {
    const { reOwnedProductId, chatId, isApproved } = approveReOwnedProductInput;

    const reOwnedProduct = await this.prisma.reOwnedProduct.findUnique({
      where: { id: reOwnedProductId },
      include: { product: true },
    });
    if (!reOwnedProduct) {
      throw new Error('ReOwnedProduct not found');
    }

    // Ensure approving business is the original owner
    if (reOwnedProduct.oldOwnerId !== approvingBusinessId) {
      throw new Error('Only the original owner can approve re-ownership');
    }

    // Verify chat ID
    if (reOwnedProduct.agreedViaChatId !== chatId) {
      throw new Error('Invalid chat ID for approval');
    }

    if (isApproved) {
      // Update product ownership
      await this.prisma.product.update({
        where: { id: reOwnedProduct.productId },
        data: { businessId: reOwnedProduct.businessId, price: reOwnedProduct.newPrice },
      });
    }

    return this.prisma.reOwnedProduct.update({
      where: { id: reOwnedProductId },
      data: { isApproved, agreementDate: isApproved ? new Date() : reOwnedProduct.agreementDate },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        product: { select: { id: true, title: true, price: true, businessId: true } },
      },
    });
  }

  async findAll(businessId: string) {
    return this.prisma.reOwnedProduct.findMany({
      where: {
        OR: [{ businessId }, { oldOwnerId: businessId }],
      },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        product: { select: { id: true, title: true, price: true, businessId: true } },
      },
    });
  }

  async findOne(id: string, businessId: string) {
    const reOwnedProduct = await this.prisma.reOwnedProduct.findUnique({
      where: { id },
      include: {
        business: { select: { id: true, name: true, email: true, createdAt: true } },
        product: { select: { id: true, title: true, price: true, businessId: true } },
      },
    });
    if (!reOwnedProduct) {
      throw new Error('ReOwnedProduct not found');
    }
    if (reOwnedProduct.businessId !== businessId && reOwnedProduct.oldOwnerId !== businessId) {
      throw new Error('Access restricted to involved businesses');
    }
    return reOwnedProduct;
  }
}