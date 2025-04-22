import { Injectable } from '@nestjs/common';
import { CreateAccountRechargeInput } from './dto/create-account-recharge.input';
import { UpdateAccountRechargeInput } from './dto/update-account-recharge.input';

@Injectable()
export class AccountRechargeService {
  create(createAccountRechargeInput: CreateAccountRechargeInput) {
    return 'This action adds a new accountRecharge';
  }

  findAll() {
    return `This action returns all accountRecharge`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountRecharge`;
  }

  update(id: number, updateAccountRechargeInput: UpdateAccountRechargeInput) {
    return `This action updates a #${id} accountRecharge`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountRecharge`;
  }
}
