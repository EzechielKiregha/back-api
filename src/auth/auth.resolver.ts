import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ClientEntity } from 'src/client/entities/client.entity';
import { CreateClientInput } from 'src/client/dto/create-client.input';
import { SignInInput } from './dto/signin.input';
import { AuthPayloadBusiness, AuthPayloadClient } from './entities/auth-payload.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayloadClient)
  async signIn(@Args('SignInInput') signInInput: SignInInput) {
    const client = await this.authService.validateClient(signInInput.email, signInInput.password);
    
    return this.authService.loginClient(client);
  }
  @Mutation(() => AuthPayloadBusiness)
  async signBusinessIn(@Args('SignInInput') signInInput: SignInInput) {
    const business = await this.authService.validateBusiness(signInInput.email, signInInput.password);

    return this.authService.loginBusiness(business);
  }
}



