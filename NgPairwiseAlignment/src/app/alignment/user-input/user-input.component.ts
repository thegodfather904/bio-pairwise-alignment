import { UserInput } from './../../shared/userInput.model';
import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/primeng';
import { AlignmentOptions } from '../../shared/alignment-options.enum';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserInputComponent implements OnInit {

  userInput = new UserInput();
  alignmentOptions: SelectItem[];

  @Output()
  alignSequences = new EventEmitter<UserInput>();

  constructor() {
    this.buildAlignmentOptionsList();
  }

  ngOnInit() {}

  buildAlignmentOptionsList() {
    this.alignmentOptions = [
      {label: AlignmentOptions.GLOBAL, value: AlignmentOptions.GLOBAL},
      {label: AlignmentOptions.LOCAL, value: AlignmentOptions.LOCAL},
      {label: AlignmentOptions.DOVETAIL, value: AlignmentOptions.DOVETAIL},
      {label: AlignmentOptions.BANDED, value: AlignmentOptions.BANDED}
    ];
  }

  onAlignSequences() {
    console.log('here');
    this.alignSequences.emit(this.userInput);
  }

}
