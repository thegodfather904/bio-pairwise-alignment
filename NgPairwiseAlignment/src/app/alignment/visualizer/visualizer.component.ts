import { Component, OnInit, Input } from '@angular/core';
import { UserInput } from '../../shared/userInput.model';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  test = 'test';

  @Input()
  userInput = new UserInput();

  constructor() { }

  ngOnInit() {
  }

}
