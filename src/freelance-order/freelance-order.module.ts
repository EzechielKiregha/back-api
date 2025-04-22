import { Module } from '@nestjs/common';
import { FreelanceOrderService } from './freelance-order.service';
import { FreelanceOrderResolver } from './freelance-order.resolver';

@Module({
  providers: [FreelanceOrderResolver, FreelanceOrderService],
})
export class FreelanceOrderModule {}
