import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { env } from 'process';
import { IApiResponse, IHeaders } from 'src/common/common.interface';
import { Readable } from 'stream';

@Injectable()
export class NetworkService {
  async createNetwork(headers: IHeaders, body: Record<string, any>) {
    try {
      const response = await axios.post(`${env.DOCKER_DAEMON}/networks/create`, {
        Name: body['name'],
        Driver: body['driver'] || 'bridge',
      });
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async getNetwork(headers: IHeaders, id: string): Promise<IApiResponse> {
    try {
      const response = await axios({
        method: 'GET',
        url: `${env.DOCKER_DAEMON}/networks/${id}`,
      });
      return {
        status: HttpStatus.OK,
        message: 'Success',
        data: response['data'],
      };
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async getNetworks(headers: IHeaders, query: Record<string, any>): Promise<IApiResponse> {
    try {
      const response = await axios({
        method: 'GET',
        url: `${env.DOCKER_DAEMON}/networks`,
      });
      return {
        status: HttpStatus.OK,
        message: 'Success',
        data: response['data'],
      };
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async deleteUnusedNetworks(headers: IHeaders, id: string) {
    try {
      const response = await axios.delete(`${env.DOCKER_DAEMON}/networks/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async deleteNetwork(headers: IHeaders, id: string) {
    try {
      await axios({
        method: 'DELETE',
        url: `${env.DOCKER_DAEMON}/networks/${id}`,
      });
      return {
        status: HttpStatus.OK,
        message: 'Success',
      };
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }

  async getNetworkDrivers(headers: IHeaders): Promise<Readable> {
    try {
      const response = await axios.get(`${env.DOCKER_DAEMON}/containers/3ff6bf88cdbb6980ea132ae90901805f151d4ad7302926638bd9965248e22042/logs?stdout=true&stderr=true&follow=true`, { responseType: 'stream' });
      // /v1.46/containers/{id}/logs
      const plugins = response.data;
      // const networkDrivers = plugins.filter((plugin) => plugin.Config.Interface.Types.includes('NetworkDriver')).map((plugin) => plugin.Name);
      return plugins;
    } catch (error) {
      throw new HttpException(error.response.data, error.response.status);
    }
  }
}
