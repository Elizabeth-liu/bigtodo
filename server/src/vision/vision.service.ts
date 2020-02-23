import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vision } from './vision.entity';
import { VisionInput } from './dto/vision.dto';

@Injectable()
export class VisionService {
  constructor(
    @InjectRepository(Vision)
    private readonly VisionRepository: Repository<Vision>
  ) {}

  async update(args: VisionInput): Promise<any> {
    const originalVision = await this.VisionRepository.findOne({
      id: 1
    });
    // console.log('originalVision', originalVision)
    // console.log('args', args)
    const newVision = {...originalVision, ...args}
    // console.log('new', newVision)
    const revision = await this.VisionRepository.save(newVision);
    return revision
  }
}
