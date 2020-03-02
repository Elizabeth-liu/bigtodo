import { Schedule } from './../schedule.entity';
import { Field, InputType } from "type-graphql";

@InputType({ description: "schedule input type" })
export class CreateInput implements Partial<Schedule> {
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  time: number;
}

@InputType({ description: "schedule update type" })
export class UpdateInput implements Partial<Schedule> {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  time: number;
  @Field()
  date: string;
}