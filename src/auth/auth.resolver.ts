import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { ClientEntity } from 'src/client/entities/client.entity';
import { CreateClientInput } from 'src/client/dto/create-client.input';
import { SignInInput } from './dto/signin.input';
import { AuthPayloadBusiness, AuthPayloadClient } from './entities/auth-payload.entity';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}

  @Mutation(() => AuthPayloadClient)
  async signIn(@Args('SignInInput') signInInput: SignInInput) {
    const client = await this.authService.validateUser(signInInput.email, signInInput.password, "client");
    
    return this.authService.loginClient(client);
  }
  @Mutation(() => AuthPayloadBusiness)
  async signBusinessIn(@Args('SignInInput') signInInput: SignInInput) {
    const business = await this.authService.validateUser(signInInput.email, signInInput.password, "business");

    return this.authService.loginBusiness(business);
  }

  @Mutation(() => AuthPayloadClient)
  async refreshToken(@Args('refreshToken') refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken);
    const { accessToken } = await this.authService.generateToken(payload.sub, payload.role);
    return { accessToken };
  }
}



