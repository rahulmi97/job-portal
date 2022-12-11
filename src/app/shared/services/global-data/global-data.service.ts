import { UserDataCacheService } from './../user-data-cache/user-data-cache.service';
import { HitApiService } from './../api-services/hit-api.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { IHitApi } from '../../interfaces/IHitApi';
import { ApiUrls } from '../../classes/ApiUrls';
import { RequestType } from '../../enums/RequestType';
import { ILoginResponse } from '../../interfaces/ILoginResponse';
import { AuthorizationType } from '../../enums/AuthorizationType';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  showLoginForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private hitApiService: HitApiService,
    private userDataCacheService: UserDataCacheService
  ) {}
  getCandidatesData(callbackFn) {
    const apiArgs: IHitApi = {
      url: ApiUrls.GET_CANDIDATES_DATA_API,
      input: {},
      requestType: RequestType.GET,
      responseFn: (candidatesData: any[]) => {
        // this.sessionSevice.login(logInData);
        this.userDataCacheService.candidates = candidatesData['data'];
        callbackFn();
      },
      errorFn: (err) => {
      },
      auth: AuthorizationType.BEARER_TOKEN,
    };
    this.hitApiService.hitApi(apiArgs);
  }
}
