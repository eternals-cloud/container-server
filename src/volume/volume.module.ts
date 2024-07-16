import { Module } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { VolumeController } from './volume.controller';

@Module({
  controllers: [VolumeController],
  providers: [VolumeService],
})
export class VolumeModule {}
