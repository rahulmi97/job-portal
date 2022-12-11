import { GlobalDataService } from './../global-data/global-data.service';
import { UserDataCacheService } from './../user-data-cache/user-data-cache.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoginResponse } from '../../interfaces/ILoginResponse';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  sessionActive: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private userDataCache: UserDataCacheService,
    private globalDataService: GlobalDataService
  ) {}
  login(response: ILoginResponse) {
    this.userDataCache.userName = response.name ? response.name : '';
    this.userDataCache.bearerToken = response.token;
    this.globalDataService.getCandidatesData(() => {
      this.verifySession();
    });
  }

  logout() {
    localStorage.clear();
    this.sessionActive.next(false);
    this.globalDataService.showLoginForm.next(false);
  }
  verifySession() {
    if (this.userDataCache.bearerToken) {
      this.sessionActive.next(true);
    } else {
      this.logout();
    }
  }
}
