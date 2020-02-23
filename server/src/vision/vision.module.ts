import { VisionService } from './vision.service';
import { Module } from '@nestjs/common';
import { VisionResolver } from './vision.resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vision } from './vision.entity';

@Module({
  providers: [ VisionResolver, VisionService],
  imports: [TypeOrmModule.forFeature([Vision])],
})
export class VisionModule {}


