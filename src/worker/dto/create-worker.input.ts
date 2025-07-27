import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateWorkerInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fullName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  role?: string;

  @Field()
  @IsString()
  password: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  isVerified: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  businessId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  kycId?: string;
}
