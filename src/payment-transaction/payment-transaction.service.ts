import { Injectable } from '@nestjs/common';
import { CreatePaymentTransactionInput } from './dto/create-payment-transaction.input';
import { UpdatePaymentTransactionInput } from './dto/update-payment-transaction.input';

@Injectable()
export class PaymentTransactionService {
  create(createPaymentTransactionInput: CreatePaymentTransactionInput) {
    return 'This action adds a new paymentTransaction';
  }

  findAll() {
    return `This action returns all paymentTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentTransaction`;
  }

  update(id: number, updatePaymentTransactionInput: UpdatePaymentTransactionInput) {
    return `This action updates a #${id} paymentTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentTransaction`;
  }
}
