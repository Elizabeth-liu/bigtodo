import { Schedule } from './../schedule.entity';
import { Field, InputType } from "type-graphql";

@InputType({ description: "schedule input type" })
export class CreateInput implements Partial<Schedule> {
  @Field()
  taskName: string;
  @Field()
  plannedTime: number;
  @Field()
  date: string;
}

@InputType({ description: "schedule update type" })
export class UpdateInput implements Partial<Schedule> {
  @Field()
  id: string;
  @Field({ nullable: true })
  taskName: string;
  @Field({ nullable: true })
  plannedTime: number;
  @Field({ nullable: true })
  actualTime: number;
}