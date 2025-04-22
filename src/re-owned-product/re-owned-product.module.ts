import { Module } from '@nestjs/common';
import { ReOwnedProductService } from './re-owned-product.service';
import { ReOwnedProductResolver } from './re-owned-product.resolver';

@Module({
  providers: [ReOwnedProductResolver, ReOwnedProductService],
})
export class ReOwnedProductModule {}
