import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {}
  store(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  fetch(key: string): any {
    const cachedObj = localStorage.getItem(key);
    if (cachedObj) {
      return JSON.parse(cachedObj);
    }
    return null;
  }
}
