import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClientService } from './client.service';
import { ClientEntity } from './entities/client.entity';
import { CreateClientInput } from './dto/create-client.input';
import { UpdateClientInput } from './dto/update-client.input';

@Resolver(() => ClientEntity)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Query(() => [ClientEntity], { name: 'clients' })
  async getClients() {
    return this.clientService.findAll();
  }

  @Mutation(() => ClientEntity)
  async CreateClient(@Args('CreateClientInput') CreateClientInput: CreateClientInput) {
    return await this.clientService.create(CreateClientInput);
  }
}
