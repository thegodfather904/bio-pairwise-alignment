import { Component, OnInit } from '@angular/core';
import { UserInput } from '../shared/userInput.model';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.css']
})
export class AlignmentComponent implements OnInit {

  userInput = new UserInput();

  constructor() {}

  ngOnInit() {}

  onAlignSequences(userInput: UserInput) {
    this.userInput = userInput;
  }

}
