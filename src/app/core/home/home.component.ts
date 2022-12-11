import { ModalService } from './../../shared/services/modal-service/modal.service';
import { HitApiService } from './../../shared/services/api-services/hit-api.service';
import { UserDataCacheService } from './../../shared/services/user-data-cache/user-data-cache.service';
import { Component, OnInit } from '@angular/core';
import { ApiUrls } from 'src/app/shared/classes/ApiUrls';
import { IHitApi } from 'src/app/shared/interfaces/IHitApi';
import { RequestType } from 'src/app/shared/enums/RequestType';
import { AuthorizationType } from 'src/app/shared/enums/AuthorizationType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  jobsListing: any[];
  currentPage: number = 1;
  showLoader: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private userDataCacheService: UserDataCacheService,
    private hitApiService: HitApiService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.jobsListing = this.userDataCacheService.candidates;
  }
  getApplicantsDetails(jobsId: string) {
    if (this.showLoader.has(jobsId) && this.showLoader.get(jobsId)) {
      return;
    }
    this.showLoader.set(jobsId, true);
    const apiArgs: IHitApi = {
      url: ApiUrls.GET_APPLICANT_DATA_API,
      input: {},
      requestType: RequestType.GET,
      responseFn: (candidatesData: any[]) => {
        this.showLoader.set(jobsId, false);
        this.modalService.openDialog(candidatesData);
      },
      errorFn: (err) => {
        this.showLoader.set(jobsId, false);
      },
      auth: AuthorizationType.BEARER_TOKEN,
    };
    apiArgs.url = apiArgs.url.replace('{job-id}', jobsId);
    this.hitApiService.hitApi(apiArgs);
  }
  changePage(pageNumber?) {
    if (pageNumber < 1 || pageNumber > 20) {
      return;
    }
    const url = `${ApiUrls.GET_CANDIDATES_DATA_API}?page=${pageNumber}`;
    this.currentPage = pageNumber;
    const apiArgs: IHitApi = {
      url: url,
      input: {},
      requestType: RequestType.GET,
      responseFn: (candidatesData: any[]) => {
        this.jobsListing = candidatesData['data'];
      },
      errorFn: (err) => {},
      auth: AuthorizationType.BEARER_TOKEN,
    };
    this.hitApiService.hitApi(apiArgs);
  }
}
