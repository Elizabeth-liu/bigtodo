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
import { CreateInput, UpdateInput } from "./dto/schedule.dto";


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
  async createSchedule(
    @Args('args') args: CreateInput
  ): Promise<Schedule> {
    return this.ScheduleService.create(args);
  }

  @Mutation(() => Schedule)
  async updateSchedule(
    @Args('args') args: UpdateInput
  ): Promise<Schedule> {
    return this.ScheduleService.update(args);
  }

  @Mutation(() => Schedule)
  async deleteSchedule(
    @Args("id") id: string
  ): Promise<Schedule> {
    return this.ScheduleService.delete(id);
  }
}