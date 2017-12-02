import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserInputComponent implements OnInit {

  alignmentType = 'Global Alignment';
  sequence1: string;
  sequence2: string;

  constructor() { }

  ngOnInit() {
  }

}
