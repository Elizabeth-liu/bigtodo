import { Vision } from './../vision.entity';
import { Field, InputType } from "node_modules/type-graphql";

@InputType({ description: "New recipe data" })
export class VisionInput implements Partial<Vision> {
  @Field({ nullable: true })
  annualVision?: string;
  @Field({ nullable: true })
  monthlyVision?: string;
  @Field({ nullable: true })
  weeklyVision?: string;
}