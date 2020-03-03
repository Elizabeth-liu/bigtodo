import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { CreateInput, UpdateInput } from './dto/schedule.dto';
import { CheckResultAndHandleErrors } from '../../node_modules/graphql-tools';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly ScheduleRepository: Repository<Schedule>
  ) {}

  async find(date: string): Promise<any> {
    const schedules = await this.ScheduleRepository.find({date})
    return schedules
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
    console.log(newSchedule)
    const result = await this.ScheduleRepository.save(newSchedule);
    return result
  }

  async delete(id: string): Promise<any> {
    await this.ScheduleRepository.delete({ id });
    return {id}
  }
}
