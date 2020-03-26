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
      // there is only one vision data currently
      id: "1"
    });
    const newVision = {...originalVision, ...args}
    const revision = await this.VisionRepository.save(newVision);
    return revision
  }
}
