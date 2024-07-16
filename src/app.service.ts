import { HttpStatus, Injectable } from '@nestjs/common';
import { IHeaders } from './common/common.interface';
import { ServiceProperties } from './common/common.constant';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: HttpStatus.OK,
      message: `Welcome 🙌 to ${ServiceProperties['name']}`,
    };
  }

  getRequestIP(headers: IHeaders) {
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: headers['ip'],
    };
  }
}
