import { ScheduleService } from './schedule.service';
import { Module } from '@nestjs/common';
import { ScheduleResolver } from './schedule.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';

@Module({
  providers: [ ScheduleResolver, ScheduleService],
  imports: [TypeOrmModule.forFeature([Schedule])],
})
export class ScheduleModule {}


