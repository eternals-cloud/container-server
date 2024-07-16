import { UserAgent } from '@eternaljs/user-agent';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment-timezone';
import * as requestIp from 'request-ip';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const reqStartTime: any = moment.utc();
    const userAgent = new UserAgent().parse(req.headers['user-agent']);
    const ipAddress = requestIp.getClientIp(req);

    req['headers']['ip'] = ipAddress?.toString()?.replace('::ffff:', '') ?? '';
    req['headers']['correlation'] = req['headers']['correlation'] ?? uuidV4();
    req['headers']['base_url'] = req['baseUrl'];
    req['headers']['hostname'] = req['hostname'];
    req['headers']['method'] = req['method'];
    req['headers']['user_agent'] = req['headers']['user-agent'];
    req['headers']['device'] = JSON.stringify(userAgent ?? {});
    req['headers']['original_url'] = req['originalUrl'];
    req['headers']['application'] = req['headers']['application'] ?? 'web';
    req['headers']['timestamp'] = reqStartTime.toDate();

    res.on('finish', () => {
      const reqEndTime = moment.utc();
      const duration = moment.duration(reqEndTime.diff(reqStartTime)).asMilliseconds();
      Logger.log(`${req.headers['ip']} | ${req['method']} | ${res['statusCode']} | ${duration}ms | ${req.headers['base_url']}`, 'RequestMiddleware');
    });

    next();
  }
}
