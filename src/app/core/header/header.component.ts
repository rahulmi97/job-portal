import { SessionService } from './../../shared/services/session-service/session.service';
import { UserDataCacheService } from './../../shared/services/user-data-cache/user-data-cache.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public userDataCache: UserDataCacheService,
    public sessionService: SessionService
  ) {}

  ngOnInit(): void {}
}
