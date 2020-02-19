import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  providers: [ UsersResolver],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}


