import { Module } from '@nestjs/common';
import { FreelanceServiceService } from './freelance-service.service';
import { FreelanceServiceResolver } from './freelance-service.resolver';

@Module({
  providers: [FreelanceServiceResolver, FreelanceServiceService],
})
export class FreelanceServiceModule {}
