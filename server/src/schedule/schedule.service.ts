import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { ScheduleInput } from './dto/schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly ScheduleRepository: Repository<Schedule>
  ) {}

  async find(date: string): Promise<any> {
    const schedules = await this.ScheduleRepository.find({date})
    console.log(schedules)
    return schedules
  }

  async update(args: ScheduleInput): Promise<any> {
    if (args.id){ // update a schedule
      const originalSchedule = await this.ScheduleRepository.findOne({
        id: args.id
      });
      const newSchedule = {...originalSchedule, ...args}
      console.log(newSchedule)
      const result = await this.ScheduleRepository.save(newSchedule);
      return result
    } else { // create a new schedule
      const schedule = await this.ScheduleRepository.create({
        ...args
      }).save()
      return schedule
    }
  }
}
