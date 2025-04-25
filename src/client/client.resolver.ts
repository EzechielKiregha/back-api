import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => ClientEntity)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [ClientEntity], { name: 'clients' })
  getClients(@Context() context) {
    const user = context.req.user; // Access the authenticated user from the request context
    console.log('Authenticated user:', user); // Log the authenticated user for debugging
    return this.clientService.findAll();
  }

  @Mutation(() => ClientEntity)
  async CreateClient(@Args('CreateClientInput') CreateClientInput: CreateClientInput) {
    return await this.clientService.create(CreateClientInput);
  }
}
