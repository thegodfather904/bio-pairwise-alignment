import { MatrixElement } from './matrix-element.model';
import { VisualizerData } from './visualizer-data.model';
import { PlotValue } from './plot-value.model';

export class GlobalAlignment {
    constructor() {}

    private plotMatrix: PlotValue[];
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
        for (let i = 0; i < seq2Length; i++) {
            this.plotMatrix[i] = new PlotValue();
            for (let j = 0; j < seq1Length; j++) {
                this.plotMatrix[i][j] = new PlotValue();
            }
        }

        // Init first row
        let pv: PlotValue;
        let currentPenalty = 0;
        for (let col = 0; col < seq1Length; col++) {
            pv = new PlotValue();
            pv.score = currentPenalty;
            currentPenalty += gapPenalty;
            this.plotMatrix[0][col] = pv;
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
        let test = 0;
        let val1;
        let val2;

        for (let row = 1; row < vd.sequence1.length + 1; row++) {
           seq1Char = vd.sequence1.charAt(row - 1);
           for (let col = 1; col < vd.sequence2.length + 1; col++) {
               seq2Char = vd.sequence2.charAt(col - 1);

               vertical = (this.plotMatrix[row - 1][col]).score + vd.gapPenalty;
               horizontal = (this.plotMatrix[row][col - 1]).score + vd.gapPenalty;
               diagnol = this.calcScoreForDiagnol(seq1Char, seq2Char, vd.seqMatch, vd.seqMismatch) +
                (this.plotMatrix[row - 1][col - 1]).score;

               maxScore = Math.max(Math.max(vertical, horizontal), diagnol);

               currentPlotValue = new PlotValue();
               currentPlotValue.score = maxScore;

               currentPlotValue.score = test++;

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

        val1 = this.plotMatrix[1][2];
        val2 = this.plotMatrix[3][1];
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
