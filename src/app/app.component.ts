import { SessionService } from './shared/services/session-service/session.service';
import { Component } from '@angular/core';
import { GlobalDataService } from './shared/services/global-data/global-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'job-portal';
  constructor(
    public sessionService: SessionService,
    public globalDataService: GlobalDataService
  ) {
    this.sessionService.verifySession();
  }
}
