import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserInputComponent implements OnInit {

  sequence1: string;
  sequence2: string;

  alignmentOptions: SelectItem[];
  alignmentType = 'Global';
  gapPenalty = -3;

  constructor() {
    this.alignmentOptions = [
      {label: 'Global', value: 'Global'},
      {label: 'Local', value: 'Local'},
      {label: 'Dovetail', value: 'Dovetail'},
      {label: 'Banded Global', value: 'Banded Global'}
    ];
  }

  ngOnInit() {}

}
