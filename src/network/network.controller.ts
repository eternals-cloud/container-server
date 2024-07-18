import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommonPaginationDto, GetIdDto } from 'src/common/common.dto';
import { CreateNetworkDto, UpdateNetworkDto } from './dto/network.dto';
import { NetworkService } from './network.service';

@Controller('network')
export class NetworkController {
  constructor(private readonly networkService: NetworkService) {}

  @Post()
  async createNetwork(@Headers() headers, @Body() body: CreateNetworkDto) {
    return await this.networkService.createNetwork(headers, body);
  }

  @Get()
  async getNetworks(@Headers() headers, @Query() query: CommonPaginationDto) {
    return await this.networkService.getNetworks(headers, query);
  }

  @Get('drivers')
  async getNetworkDrivers(@Headers() headers, @Res() res: Response) {
    const log = await this.networkService.getNetworkDrivers(headers);
    log.pipe(res);
  }

  @Get(':id')
  async getNetwork(@Headers() headers, @Param() param: GetIdDto) {
    return await this.networkService.getNetwork(headers, param.id);
  }

  @Patch(':id')
  async updateNetwork(@Headers() headers, @Param() param: GetIdDto, @Body() body: UpdateNetworkDto) {
    return await this.networkService.updateNetwork(headers, param.id, body);
  }

  @Delete(':id')
  async deleteNetwork(@Headers() headers, @Param() param: GetIdDto) {
    return await this.networkService.deleteNetwork(headers, param.id);
  }
}
