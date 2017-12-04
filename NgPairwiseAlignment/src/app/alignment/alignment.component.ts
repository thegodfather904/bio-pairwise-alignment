import { GlobalAlignment } from './../shared/globa-alignment.model';
import { MatrixElement } from './../shared/matrix-element.model';
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

  visualizerData = new VisualizerData();

  constructor() {}

  ngOnInit() {}

  onAlignSequences(userInput: UserInput) {
    let vd = new VisualizerData();
    vd.sequence1 = userInput.sequence1;
    vd.sequence2 = userInput.sequence2;
    vd.gapPenalty = userInput.gapPenalty;

    if (userInput.alignmentType === AlignmentOptions.GLOBAL) {
     vd = this.runGlobalAlignment(vd);
    }

    vd.matrixElementWidth = this.calcAlignmentMatrixElementWidth(userInput.sequence1.length);
    this.visualizerData = vd;
  }

  /* Width = 100% divided by length of sequence 1 + 2 (to account for the first stuff added)*/
  calcAlignmentMatrixElementWidth(sequence1Length: number): string {
    return (100 / (sequence1Length + 2)).toFixed(2) + '%';
  }

  // TODO probs move to service class at some point
  runGlobalAlignment(vd: VisualizerData): VisualizerData {
    const ga = new GlobalAlignment();
    vd = ga.runGlobalAlignment(vd);
    return vd;
  }

}
