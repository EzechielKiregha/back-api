import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdService } from './ad.service';
import { AdEntity } from './entities/ad.entity';
import { CreateAdInput } from './dto/create-ad.input';
import { UpdateAdInput } from './dto/update-ad.input';

@Resolver(() => AdEntity)
export class AdResolver {
  constructor(private readonly adService: AdService) {}

  @Mutation(() => AdEntity)
  createAd(@Args('createAdInput') createAdInput: CreateAdInput) {
    return this.adService.create(createAdInput);
  }

  @Query(() => [AdEntity], { name: 'ad' })
  findAll() {
    return this.adService.findAll();
  }

  @Query(() => AdEntity, { name: 'ad' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.adService.findOne(id);
  }

  @Mutation(() => AdEntity)
  updateAd(@Args('updateAdInput') updateAdInput: UpdateAdInput) {
    return this.adService.update(updateAdInput.id, updateAdInput);
  }

  @Mutation(() => AdEntity)
  removeAd(@Args('id', { type: () => Int }) id: number) {
    return this.adService.remove(id);
  }
}
