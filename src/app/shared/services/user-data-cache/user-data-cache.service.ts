import { Injectable } from '@angular/core';
import { CacheService } from '../cache-service/cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataCacheService extends CacheService {
  readonly BEARER_TOKEN = `bearerToken`;
  readonly USER_NAME = `userName`;
  readonly CANDIDATES_DATA = `candidatesData`;
  constructor() {
    super();
  }
  get bearerToken(): string {
    return this.fetch(this.BEARER_TOKEN);
  }

  set bearerToken(value: string) {
    this.store(this.BEARER_TOKEN, value);
  }
  get userName(): string {
    return this.fetch(this.USER_NAME);
  }
  set userName(firstName: string) {
    this.store(this.USER_NAME, firstName);
  }

  set candidates(candidatesData: any[]) {
    this.store(this.CANDIDATES_DATA, candidatesData);
  }
  get candidates(): any[] {
    return this.fetch(this.CANDIDATES_DATA);
  }
}
