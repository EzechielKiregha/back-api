import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TokenTransactionResolver } from './token-transaction.resolver';
import { TokenTransactionService } from './token-transaction.service';


// Module
@Module({
  providers: [TokenTransactionResolver, TokenTransactionService, PrismaService],
})
export class TokenTransactionModule {}