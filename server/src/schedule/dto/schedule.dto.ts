import { Schedule } from './../schedule.entity';
import { Field, InputType } from "type-graphql";

@InputType({ description: "New recipe data" })
export class ScheduleInput implements Partial<Schedule> {
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  time: number;
  @Field({ nullable: true })
  date: string;
}