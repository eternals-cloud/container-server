import { Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { IHeaders } from './common.interface';

@Injectable()
export class CommonService {
  constructor() {}

  async getCode(headers: IHeaders, model: any, prefix: string) {
    const code = String(`${prefix}-${uuidV4()?.split('-')?.shift()}`)?.toUpperCase();
    const isCode = await model.findOne({ code });
    if (isCode) await this.getCode(headers, model, prefix);
    return code;
  }

  async generateOTP() {
    const digits = '0123456789';
    const length = 6;
    let OTP = '';
    for (let i = 1; i <= length; i++) {
      const index = Math.floor(Math.random() * digits.length);
      OTP += digits[index];
    }
    return OTP;
  }
}
