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
    this.visualizerData.sequence1 = userInput.sequence1;
    this.visualizerData.sequence2 = userInput.sequence2;
    this.visualizerData.gapPenalty = userInput.gapPenalty;
    this.visualizerData.matrixElementWidth = this.calcAlignmentMatrixElementWidth(userInput.sequence1.length);

    if (userInput.alignmentType === AlignmentOptions.GLOBAL) {
     this.visualizerData = this.runGlobalAlignment(this.visualizerData);
    }
  }

  /* Width = 100% divided by length of sequence 1 + 2 (to account for the first stuff added)*/
  calcAlignmentMatrixElementWidth(sequence1Length: number): string {
    return (100 / (sequence1Length + 2)).toFixed(2) + '%';
  }

  // TODO probs move to service class at some point
  runGlobalAlignment(vd: VisualizerData): VisualizerData {
    vd.score = -18;
    const me = [
      new MatrixElement('', 'sequence-value start-value first-row'),
      new MatrixElement('', 'sequence-value first-row'),
      new MatrixElement('A', 'sequence-value first-row'),
      new MatrixElement('C', 'sequence-value first-row'),
      new MatrixElement('G', 'sequence-value first-row'),
      new MatrixElement('', 'sequence-value start-value'),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('G', 'sequence-value start-value'),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('C', 'sequence-value start-value'),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('G', 'sequence-value start-value'),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', ''),
      new MatrixElement('0', '')
    ];

    vd.alignmentMatrix = me;

    return vd;
  }

}
