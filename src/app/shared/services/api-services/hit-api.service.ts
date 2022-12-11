import { UserDataCacheService } from './../user-data-cache/user-data-cache.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthorizationType } from '../../enums/AuthorizationType';
import { RequestType } from '../../enums/RequestType';
import { IHitApi } from '../../interfaces/IHitApi';

@Injectable({
  providedIn: 'root',
})
export class HitApiService {
  get DEFAULT_BASE_URL(): string {
    return environment.baseUrl;
  }
  constructor(
    private http: HttpClient,
    private userDataService: UserDataCacheService
  ) {}
  requestForData(
    url: string,
    requestType: RequestType,
    input: any,
    authorization: AuthorizationType
  ) {
    url = `${this.DEFAULT_BASE_URL}${url}`;
    let options = {
      headers: {},
    };

    if (authorization === AuthorizationType.BEARER_TOKEN) {
      const bearerToken = this.userDataService.bearerToken;
      options['headers']['Authorization'] = `${bearerToken}`;
    }
    if (requestType === RequestType.POST) {
      return this.http.post(url, input, options);
    } else if (requestType === RequestType.GET) {
      return this.http.get(url, options);
    }
  }
  hitApi(args: IHitApi) {
    this.requestForData(
      args.url,
      args.requestType,
      args.input,
      args.auth
    ).subscribe(
      (httpResponse) => {
        if (httpResponse) {
          args.responseFn(httpResponse['data']);
        }
      },
      (error) => {
        if (args.errorFn) {
          args.errorFn(error);
        }
      }
    );
  }
}
