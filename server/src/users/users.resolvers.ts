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
// import * as bcrypt from "bcryptjs";

import { User } from "./user.entity";

@Resolver(User)
export class UsersResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }

  @FieldResolver()
  async name(@Root() parent: User) {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Mutation(() => User)
  async register(
    @Args("firstName") firstName: string,
    @Args("lastName") lastName: string,
    @Args("email") email: string,
    @Args("password") password: string
  ): Promise<User> {
    // const hashedPassword = await bcrypt.hash(password, 12);
    const hashedPassword = "123"

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    // console.log(user)
    return user;
  }
}