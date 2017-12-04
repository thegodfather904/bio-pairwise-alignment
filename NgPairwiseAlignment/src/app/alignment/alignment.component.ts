import { Component, OnInit } from '@angular/core';
import { UserInput } from '../shared/userInput.model';
import { VisualizerData } from '../shared/visualizer-data.model';
import { AlignmentOptions } from '../shared/alignment-options.enum';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.css']
})
export class AlignmentComponent implements OnInit {

  userInput = new UserInput();
  visualizerData = new VisualizerData();

  constructor() {}

  ngOnInit() {}

  onAlignSequences(userInput: UserInput) {
    this.userInput = userInput;

    this.visualizerData.sequence1 = userInput.sequence1;
    this.visualizerData.sequence2 = userInput.sequence2;
    this.visualizerData.gapPenalty = userInput.gapPenalty;

    if (userInput.alignmentType === AlignmentOptions.GLOBAL) {
     this.visualizerData = this.runGlobalAlignment(this.visualizerData);
    }
  }

  // TODO probs move to service class at some point
  runGlobalAlignment(vd: VisualizerData): VisualizerData {
    vd.score = -18;
    return vd;
  }

}
