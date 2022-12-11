import { GlobalDataService } from './../../shared/services/global-data/global-data.service';
import { Component, OnInit } from '@angular/core';
import { ICardData } from 'src/app/shared/interfaces/ICardData';
import { cardData, companyImages } from './dummyData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass'],
})
export class AboutComponent implements OnInit {
  cardData: ICardData[] = cardData;
  imagesUrl = companyImages;
  constructor(private globalDataService: GlobalDataService) {}

  ngOnInit(): void {
  }
  goToLogingPage() {
    this.globalDataService.showLoginForm.next(true);
  }
}
