import { Component, OnInit, Input } from '@angular/core';
import { UserInput } from '../../shared/userInput.model';
import { VisualizerData } from '../../shared/visualizer-data.model';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  @Input()
  vd: VisualizerData;

  constructor() { }

  ngOnInit() {
  }

}
