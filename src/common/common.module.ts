import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { DockerService } from './services/docker.service';

@Global()
@Module({
  imports: [],
  controllers: [CommonController],
  providers: [CommonService, DockerService],
  exports: [CommonService],
})
export class CommonModule {}
