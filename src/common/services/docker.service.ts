import { Injectable, OnModuleInit } from '@nestjs/common';
import * as http from 'http';

@Injectable()
export class DockerService implements OnModuleInit {
  private socketPath: string = '/var/run/docker.sock';

  async onModuleInit() {
    await this.listContainers();
  }

  private request(options: http.RequestOptions, callback: (res: any) => void) {
    options.socketPath = this.socketPath;
    const req = http.request(options, callback);
    req.end();
  }

  listContainers(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.request({ path: '/containers/json', method: 'GET' }, (res) => {
        let data = '';
        console.log('res', res);
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
        res.on('error', (err) => reject(err));
      });
    });
  }
}
