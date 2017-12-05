import { MatrixElement } from './matrix-element.model';
import { VisualizerData } from './visualizer-data.model';
import { PlotValue } from './plot-value.model';
import { identifierModuleUrl } from '@angular/compiler';

export class GlobalAlignment {
    constructor() {}

    private plotMatrix;
    private plotMaxScore: number;

    runGlobalAlignment(vd: VisualizerData): VisualizerData  {

        this.plotInit(vd.sequence1.length, vd.sequence2.length, vd.gapPenalty);

        this.fillOutPlot(vd);

        vd.score = this.plotMaxScore;

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

    plotInit(seq1Length: number, seq2Length: number, gapPenalty: number) {
        // Initialize empty plot
        seq1Length++;
        seq2Length++;

        this.plotMatrix = [];
        for (let row = 0; row < seq2Length; row++) {
            this.plotMatrix[row] = [];
        }

        for (let r = 0; r < seq2Length; r++) {
            for (let c = 0; c < seq1Length; c++) {
                this.plotMatrix[r][c] = new PlotValue();
            }
        }

        // Init first row
        let pv: PlotValue;
        let currentPenalty = 0;
        for (let c = 0; c < seq1Length; c++) {
            pv = new PlotValue();
            pv.score = currentPenalty;
            currentPenalty += gapPenalty;
            this.plotMatrix[0][c] = pv;
        }

        // Init first col
        currentPenalty = gapPenalty;
        for (let row = 1; row < seq2Length; row++) {
            pv = new PlotValue();
            pv.score = currentPenalty;
            currentPenalty += gapPenalty;
            this.plotMatrix[row][0] = pv;
        }
    }

    fillOutPlot(vd: VisualizerData) {
        let vertical: number;
        let horizontal: number;
        let diagnol: number;
        let seq1Char: string;
        let seq2Char: string;
        let maxScore: number;
        let currentPlotValue: PlotValue;

        for (let row = 1; row < vd.sequence1.length + 1; row++) {
           seq2Char = vd.sequence2.charAt(row - 1);
           for (let col = 1; col < vd.sequence2.length + 1; col++) {
               seq1Char = vd.sequence1.charAt(col - 1);

               vertical = (this.plotMatrix[row - 1][col]).score + vd.gapPenalty;
               horizontal = (this.plotMatrix[row][col - 1]).score + vd.gapPenalty;
               diagnol = this.calcScoreForDiagnol(seq1Char, seq2Char, vd.seqMatch, vd.seqMismatch) +
                (this.plotMatrix[row - 1][col - 1]).score;

               maxScore = Math.max(Math.max(vertical, horizontal), diagnol);

               currentPlotValue = new PlotValue();
               currentPlotValue.score = maxScore;
               this.plotMatrix[row][col] = currentPlotValue;

               if (diagnol === maxScore) {
                   currentPlotValue.diagnol = this.plotMatrix[row - 1][col - 1];
               }
               if (vertical === maxScore) {
                   currentPlotValue.vertical = this.plotMatrix[row - 1][col];
               }
               if (horizontal === maxScore) {
                currentPlotValue.horizontal = this.plotMatrix[row][col - 1];
               }
           }
        }

        this.plotMaxScore = (this.plotMatrix[vd.sequence1.length][vd.sequence2.length]).score;
    }

    calcScoreForDiagnol(seq1Char: string, seq2Char: string, match: number, mismatch: number): number {
        let score = 0;
        if (seq1Char === seq2Char) {
           score = match;
        }else {
            score = mismatch;
        }
        return score;
    }

}
