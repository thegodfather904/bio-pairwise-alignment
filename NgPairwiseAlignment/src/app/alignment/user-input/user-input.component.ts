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

  maxSequenceLength = 20;
  userInput = new UserInput();
  seq1CharsUsed = 0;
  seq2CharsUsed = 0;
  alignmentOptions: SelectItem[];

  @Output()
  alignSequences = new EventEmitter<UserInput>();

  @Output()
  resetAlignment = new EventEmitter<any>();

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
    this.alignSequences.emit(this.userInput);
  }

  onReset() {
    this.userInput = new UserInput();
    this.resetAlignment.emit();
  }

  seq1InputChange() {
    this.seq1CharsUsed = this.userInput.sequence1.length;
  }

  seq2InputChange() {
    this.seq2CharsUsed = this.userInput.sequence2.length;
  }

}
