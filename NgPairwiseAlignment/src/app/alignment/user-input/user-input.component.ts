import { AlignmentOptions } from './../../shared/alignment-options.enum';
import { GlobalAlignment } from './../../shared/globa-alignment.model';
import { UserInput } from './../../shared/userInput.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent implements OnInit {

  maxSequenceLength = 20;
  userInput = new UserInput();
  seq1CharsUsed = 0;
  seq2CharsUsed = 0;
  alignmentOptions: string[];

  @Output()
  alignSequences = new EventEmitter<UserInput>();

  @Output()
  resetAlignment = new EventEmitter<any>();

  constructor() {
    this.buildAlignmentOptionsList();
  }

  ngOnInit() {}

  buildAlignmentOptionsList() {
     this.alignmentOptions = new Array<string>();
     this.alignmentOptions.push(AlignmentOptions.GLOBAL);
     this.alignmentOptions.push(AlignmentOptions.LOCAL);
     this.alignmentOptions.push(AlignmentOptions.DOVETAIL);
     this.alignmentOptions.push(AlignmentOptions.BANDED);
  }

  onAlignSequences() {
    this.alignSequences.emit(this.userInput);
  }

  onReset() {
    this.userInput = new UserInput();
    this.seq1CharsUsed = 0;
    this.seq2CharsUsed = 0;
    this.resetAlignment.emit();
  }

  seq1InputChange() {
    this.seq1CharsUsed = this.userInput.sequence1.length;
  }

  seq2InputChange() {
    this.seq2CharsUsed = this.userInput.sequence2.length;
  }

}
