import { GlobalAlignment } from './../shared/globa-alignment.model';
import { MatrixElement } from './../shared/matrix-element.model';
import { Component, OnInit } from '@angular/core';
import { UserInput } from '../shared/userInput.model';
import { VisualizerData } from '../shared/visualizer-data.model';
import { AlignmentOptions } from '../shared/alignment-options.enum';
import { LocalAlignment } from '../shared/local-alignment.model';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.css']
})
export class AlignmentComponent implements OnInit {

  visualizerData = new VisualizerData();
  alignSequenceClicked = false;

  constructor() {}

  ngOnInit() {}

  onAlignSequences(userInput: UserInput) {
    let vd = new VisualizerData();
    vd.sequence1 = userInput.sequence1;
    vd.sequence2 = userInput.sequence2;
    vd.gapPenalty = userInput.gapPenalty;
    vd.seqMatch = userInput.seqMatch;
    vd.seqMismatch = userInput.seqMismatch;

    if (userInput.alignmentType === AlignmentOptions.GLOBAL) {
     vd = this.runGlobalAlignment(vd);
    } else if (userInput.alignmentType === AlignmentOptions.LOCAL) {
      vd = this.runLocalAlignment(vd);
    }

    vd.matrixElementWidth = this.calcAlignmentMatrixElementWidth(userInput.sequence1.length);
    this.visualizerData = vd;

    this.alignSequenceClicked = true;
  }

  onResetAlignment() {
    this.visualizerData = new VisualizerData();
    this.alignSequenceClicked = false;
  }

  /* Width = 100% divided by length of sequence 1 + 2 (to account for the first stuff added)*/
  calcAlignmentMatrixElementWidth(sequence1Length: number): string {
    return Math.floor((100 / (sequence1Length + 2))) + '%';
  }

  // TODO probs move to service class at some point
  runGlobalAlignment(vd: VisualizerData): VisualizerData {
    const ga = new GlobalAlignment();
    vd = ga.runGlobalAlignment(vd);
    return vd;
  }

  runLocalAlignment(vd: VisualizerData): VisualizerData {
    const la = new LocalAlignment();
    vd = la.runLocalAlignment(vd);
    return vd;
  }

}
