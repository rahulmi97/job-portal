import { ILoginResponse } from './../../shared/interfaces/ILoginResponse';
import { SessionService } from './../../shared/services/session-service/session.service';
import { HitApiService } from './../../shared/services/api-services/hit-api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IHitApi } from 'src/app/shared/interfaces/IHitApi';
import { ApiUrls } from 'src/app/shared/classes/ApiUrls';
import { RequestType } from 'src/app/shared/enums/RequestType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  showLoader: boolean = false;
  showErrorMsg: boolean=false;
  constructor(
    private hitApiService: HitApiService,
    private sessionSevice: SessionService
  ) {}

  ngOnInit(): void {}
  hitLoginApi() {

    if (this.showLoader) {
      return;
    }
    this.showErrorMsg=false;
    this.showLoader = true;
    this.loginFormGroup.markAllAsTouched();
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.updateValueAndValidity();
      return;
    }
    console.log(this.loginFormGroup);
    const apiArgs: IHitApi = {
      url: ApiUrls.LOGIN_API_ENDPOINT,
      input: this.loginFormGroup.value,
      requestType: RequestType.POST,
      responseFn: (logInData: ILoginResponse) => {
        console.log(logInData);
        // this.showLoader=false;
        this.sessionSevice.login(logInData);
        this.showErrorMsg=false
      },
      errorFn: (err) => {
        this.showLoader = false;
        this.showErrorMsg=true
        console.log(err);
      },
    };
    this.hitApiService.hitApi(apiArgs);
  }
}
