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

import { Schedule } from "./schedule.entity";
import { ScheduleService } from "./schedule.service";
import { ScheduleInput } from "./dto/schedule.dto";


@Resolver(Schedule)
export class ScheduleResolver {
  constructor(private readonly ScheduleService: ScheduleService) {}

  @Query(() => [Schedule])
  async schedules(
    @Args("date") date: string
  ): Promise<Schedule[]> {
    let schedules = await this.ScheduleService.find(date)
    return schedules;
  }

  @Mutation(() => Schedule)
  async updateSchedules(
    @Args('args') args: ScheduleInput
  ): Promise<Schedule> {
    return this.ScheduleService.update(args);
  }
}