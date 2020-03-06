import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateInput, UpdateInput } from './dto/schedule.dto';
import { CheckResultAndHandleErrors } from '../../node_modules/graphql-tools';
var moment = require('moment');

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly ScheduleRepository: Repository<Schedule>
  ) {}

  async find(date: string ): Promise<any> {
    // get schedules for the whole week
    if (date === "week") {
      const dates = []
      for (let i = 0; i<7; i++) {
        dates.push(moment().weekday(i).format('LL')) 
      }
      var schedules = []
      await Promise.all(dates.map(async date => {
        const schedule = await this.ScheduleRepository.find({date})
        schedules = schedules.concat(schedule)
      }))
      return schedules
    } else {
      // get schedule for a day
      return await this.ScheduleRepository.find({date})
    }
  }

  async create(args: CreateInput): Promise<any> {
    const schedule = await this.ScheduleRepository.create({
      ...args,
    }).save()
    return schedule
  }

  async update(args: UpdateInput): Promise<any> {
    const originalSchedule = await this.ScheduleRepository.findOne({
      id: args.id
    });
    const newSchedule = {...originalSchedule, ...args}
    // console.log(newSchedule)
    // create方法不知道为什么报错：duplicate key id...回退到之前调试好的版本也不行。。。
    await this.ScheduleRepository.update(args.id, newSchedule);
    return newSchedule
  }

  async delete(id: string): Promise<any> {
    await this.ScheduleRepository.delete({ id });
    return {id}
  }
}
