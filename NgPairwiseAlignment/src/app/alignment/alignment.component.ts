import { SequenceBarComponent } from './sequence-bar/sequence-bar.component';
import { AlignmentOptions } from './../shared/alignment-options.enum';
import { GlobalAlignment } from './../shared/globa-alignment.model';
import { MatrixElement } from './../shared/matrix-element.model';
import { Component, OnInit } from '@angular/core';
import { UserInput } from '../shared/userInput.model';
import { VisualizerData } from '../shared/visualizer-data.model';
import { LocalAlignment } from '../shared/local-alignment.model';
import { BandedGlobalAlignment } from '../shared/banded-alignment.model';
import { DovetailAlignment } from '../shared/dovetail-alignment.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alignment',
  templateUrl: './alignment.component.html',
  styleUrls: ['./alignment.component.scss']
})
export class AlignmentComponent implements OnInit {

  visualizerData = new VisualizerData();
  alignSequenceClicked = false;

  constructor(public snackBar: MatSnackBar) {}

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
    }else if (userInput.alignmentType === AlignmentOptions.BANDED) {
      vd = this.runBandedGlobalAlignment(vd, userInput.bandedAlignmentMax);
    }else if (userInput.alignmentType === AlignmentOptions.DOVETAIL) {
      vd = this.runDovetailAlignment(vd);
    }

    vd.matrixElementWidth = this.calcAlignmentMatrixElementWidth(userInput.sequence1.length);
    this.visualizerData = vd;

    this.alignSequenceClicked = true;

    this.openSnackBar(userInput.sequence1, userInput.sequence2);
  }

  openSnackBar(seq1: string, seq2: string) {
    const snackBarRef = this.snackBar.openFromComponent(SequenceBarComponent, {
      data: {
        sequence1: seq1,
        sequence2: seq2
      }
    });
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

  runBandedGlobalAlignment(vd: VisualizerData, bandedAlignmentMin: number): VisualizerData {
    const ba = new BandedGlobalAlignment();
    vd = ba.runGlobalAlignment(vd, bandedAlignmentMin);
    return vd;
  }

  runDovetailAlignment(vd: VisualizerData): VisualizerData {
    const da = new DovetailAlignment();
    vd = da.runDovetailAlignment(vd);
    return vd;
  }

}
