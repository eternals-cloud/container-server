export interface IApiResponse {
  status: number;
  message: string;
  data?: any;
}

export interface IHeaders {
  ip?: string;
  base_url?: string;
  method?: string;
  hostname?: string;
  original_url?: string;
  user_agent?: string;
  correlation?: string;
  device?: string;
  client?: string;
  range?: any;
  user?: string;
  username?: string;
  email?: string;
  mobile?: string;
  first_name?: string;
  last_name?: string;
  session?: string;
  application?: ApplicationType;
  remember?: boolean;
  timestamp?: any;
}

export type ApplicationType = 'web' | 'app';

export interface IEventEmitter {
  headers: IHeaders;
  data: any;
}
