import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-sequence-bar',
  templateUrl: './sequence-bar.component.html',
  styleUrls: ['./sequence-bar.component.scss']
})
export class SequenceBarComponent implements OnInit {

  sequence1: string;
  sequence2: string;

  constructor(public snackBarRef: MatSnackBarRef<SequenceBarComponent>) {
    this.sequence1 = this.snackBarRef.containerInstance.snackBarConfig.data.sequence1;
    this.sequence2 = this.snackBarRef.containerInstance.snackBarConfig.data.sequence2;
  }

  ngOnInit() {
  }

}
