import { CreateWorkerInput } from './create-worker.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkerInput extends PartialType(CreateWorkerInput) {
  @Field(() => Int)
  id: number;
}
