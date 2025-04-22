import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TokenService } from './token.service';
import { TokenEntity } from './entities/token.entity';
import { CreateTokenInput } from './dto/create-token.input';
import { UpdateTokenInput } from './dto/update-token.input';

@Resolver(() => TokenEntity)
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}

  @Mutation(() => TokenEntity)
  createToken(@Args('createTokenInput') createTokenInput: CreateTokenInput) {
    return this.tokenService.create(createTokenInput);
  }

  @Query(() => [TokenEntity], { name: 'token' })
  findAll() {
    return this.tokenService.findAll();
  }

  @Query(() => TokenEntity, { name: 'token' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tokenService.findOne(id);
  }

  @Mutation(() => TokenEntity)
  updateToken(@Args('updateTokenInput') updateTokenInput: UpdateTokenInput) {
    return this.tokenService.update(updateTokenInput.id, updateTokenInput);
  }

  @Mutation(() => TokenEntity)
  removeToken(@Args('id', { type: () => Int }) id: number) {
    return this.tokenService.remove(id);
  }
}
