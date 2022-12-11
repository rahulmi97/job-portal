import { ModalService } from './../../services/modal-service/modal.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  applicants: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public modalService: ModalService
  ) {
    console.log(data, '++++++++++++++++++++++');
    this.applicants = data;
  }

  ngOnInit(): void {}
}
