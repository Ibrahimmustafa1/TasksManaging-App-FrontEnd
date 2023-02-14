import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private Matdialog: MatDialog, private dialog: MatDialogRef<ConfirmDialogComponent>) { }

  ngOnInit(): void {
  }
  confirm() {
    this.Matdialog.closeAll()
  }
  discard() {
    this.dialog.close()
  }
}
