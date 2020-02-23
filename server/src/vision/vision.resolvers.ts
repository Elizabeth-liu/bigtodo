import {
  Resolver,
  Query,
  Mutation,
  Args,
} from "@nestjs/graphql";
import {
  FieldResolver,
  Root
} from "type-graphql";

import { Vision } from "./vision.entity";
import { VisionService } from "./vision.service";
import { VisionInput } from "./dto/vision.dto";


@Resolver(Vision)
export class VisionResolver {
  constructor(private readonly VisionService: VisionService) {}

  @Query(() => Vision)
  async visions() {
    let vision = await Vision.find()
    if (vision.length===0) {
      const vision = await Vision.create({
        annualVision: '',
        monthlyVision: '',
        weeklyVision: ''
      }).save();
    }
    // console.log('a', vision)
    return vision[0];
  }

  @Mutation(() => Vision)
  async updateVisions(
    @Args('args') args: VisionInput
  ): Promise<Vision> {
    return this.VisionService.update(args);
  }
}