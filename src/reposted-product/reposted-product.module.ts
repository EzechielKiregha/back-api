import { Module } from '@nestjs/common';
import { RepostedProductService } from './reposted-product.service';
import { RepostedProductResolver } from './reposted-product.resolver';

@Module({
  providers: [RepostedProductResolver, RepostedProductService],
})
export class RepostedProductModule {}
