import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Get('health')
  getHello() {
    return this.appService.getHello();
  }

  @Get('ip')
  getRequestIP(@Headers() headers) {
    return this.appService.getRequestIP(headers);
  }
}
