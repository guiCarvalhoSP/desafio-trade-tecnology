import { IResponseApi } from './response.interface';

export interface IStatusResponse extends IResponseApi {
  response: {
    account: {
      firstname: string;
      lastname: string;
      email: string;
    };
    subscription: {
      plan: string;
      end: string;
      active: boolean;
    };
    requests: {
      current: number;
      limit_day: number;
    };
  };
}
