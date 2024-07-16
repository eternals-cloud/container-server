import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VolumeService } from './volume.service';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';

@Controller('volume')
export class VolumeController {
  constructor(private readonly volumeService: VolumeService) {}

  @Post()
  create(@Body() createVolumeDto: CreateVolumeDto) {
    return this.volumeService.create(createVolumeDto);
  }

  @Get()
  findAll() {
    return this.volumeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.volumeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVolumeDto: UpdateVolumeDto) {
    return this.volumeService.update(+id, updateVolumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volumeService.remove(+id);
  }
}
