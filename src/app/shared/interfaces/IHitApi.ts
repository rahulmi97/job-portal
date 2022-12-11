import { AuthorizationType } from '../enums/AuthorizationType';
import { RequestType } from '../enums/RequestType';

export interface IHitApi {
  url: string;
  input: object;
  requestType: RequestType;
  responseFn: (data) => void;
  errorFn: (error) => void;
  auth?: AuthorizationType;
}
