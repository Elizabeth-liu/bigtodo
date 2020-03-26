import { Vision } from '../vision.entity';
import { Field, InputType } from "type-graphql";

@InputType({ description: "vision input type" })
export class VisionInput implements Partial<Vision> {
  @Field({ nullable: true })
  annualVision?: string;
  @Field({ nullable: true })
  monthlyVision?: string;
  @Field({ nullable: true })
  weeklyVision?: string;
}