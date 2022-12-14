import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRef: MatDialogRef<ModalComponent>;
  constructor(private dialog: MatDialog) {}

  openDialog(data) {
    this.modalRef = this.dialog.open(ModalComponent, {
      data: data,
    });
  }
  closeModal() {
    this.modalRef.close();
  }
}
