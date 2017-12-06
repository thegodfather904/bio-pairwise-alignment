import { AlignmentUtil } from './alignment-util';
import { PlotValue } from './plot-value.model';
import { VisualizerData } from './visualizer-data.model';

export class LocalAlignment {
    constructor() {}

    private plotMatrix;
    private plotMaxScore: number;
    private seq1Final: string;
    private seq2Final: string;

    private maxScorePlotValue: PlotValue;

    runLocalAlignment(vd: VisualizerData): VisualizerData {
        this.plotInit(vd.sequence1.length, vd.sequence2.length);
        this.fillOutPlot(vd);
        this.backTrackForAlignment(vd.sequence1, vd.sequence2);
        vd.score = this.plotMaxScore;
        const util = new AlignmentUtil();
        vd.alignmentMatrix = util.convertPlotMatrixToAlignmentMatrix(vd.sequence1, vd.sequence2, this.plotMatrix);
        vd.seq1Final = this.seq1Final;
        vd.seq2Final = this.seq2Final;
        return vd;
    }


    plotInit(seq1Length: number, seq2Length: number) {
        // Initialize empty plot
        seq1Length++;
        seq2Length++;

        this.plotMatrix = [];
        for (let r = 0; r < seq2Length; r++) {
            this.plotMatrix[r] = [];
            for (let c = 0; c < seq1Length; c++) {
                this.plotMatrix[r][c] = new PlotValue();
            }
        }

        // Init first row to 0's
        let pv: PlotValue;
        for (let c = 0; c < seq1Length; c++) {
            pv = new PlotValue();
            pv.score = 0;
            this.plotMatrix[0][c] = pv;
        }

        // Init first col to 0's
        for (let row = 1; row < seq2Length; row++) {
            pv = new PlotValue();
            pv.score = 0;
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

        let maxPlotValue = this.plotMatrix[0][0];

        for (let row = 1; row < vd.sequence2.length + 1; row++) {
           seq2Char = vd.sequence2.charAt(row - 1);
           for (let col = 1; col < vd.sequence1.length + 1; col++) {
               seq1Char = vd.sequence1.charAt(col - 1);

               vertical = (this.plotMatrix[row - 1][col]).score + vd.gapPenalty;
               horizontal = (this.plotMatrix[row][col - 1]).score + vd.gapPenalty;
               diagnol = this.calcScoreForDiagnol(seq1Char, seq2Char, vd.seqMatch, vd.seqMismatch) +
                (this.plotMatrix[row - 1][col - 1]).score;

               maxScore = Math.max(Math.max(vertical, horizontal), diagnol);

               if (maxScore < 0) {
                   maxScore = 0;
               }

               currentPlotValue = new PlotValue();
               currentPlotValue.score = maxScore;
               currentPlotValue.row = row;
               currentPlotValue.col = col;
               this.plotMatrix[row][col] = currentPlotValue;

               if (maxPlotValue.score < maxScore) {
                    maxPlotValue = currentPlotValue;
               }

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

        this.plotMaxScore = maxPlotValue.score;
        this.maxScorePlotValue = maxPlotValue;
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

    backTrackForAlignment(sequence1: string, sequence2: string) {

    // start at max score (might not be bottom right corner)
    let currentPv = this.maxScorePlotValue;
    currentPv.inAlignment = true;

    let seq1Pos = currentPv.col - 1;
    let seq2Pos = currentPv.row - 1;

    let seq1Final = '';
    let seq2Final = '';

    const dash = '-';

    // go until null or hit a 0;
    while ( (currentPv.diagnol != null && currentPv.diagnol.score !== 0) ||
    (currentPv.vertical != null && currentPv.vertical.score !== 0) ||
    (currentPv.horizontal != null && currentPv.horizontal.score !== 0) )  {
        if (currentPv.diagnol != null) {
            currentPv = currentPv.diagnol;
            currentPv.inAlignment = true;
            seq1Final += sequence1.charAt(seq1Pos--);
            seq2Final += sequence2.charAt(seq2Pos--);
        } else if (currentPv.vertical != null) {
            currentPv = currentPv.vertical;
            currentPv.inAlignment = true;
            seq1Final += dash;
            seq2Final += sequence2.charAt(seq2Pos--);
        } else if (currentPv.horizontal != null) {
            currentPv = currentPv.horizontal;
            currentPv.inAlignment = true;
            seq1Final += sequence1.charAt(seq1Pos--);
            seq2Final += dash;
        }
    }

    if (currentPv != null && currentPv.score !== 0) {
        currentPv.inAlignment = true;
        seq1Final += sequence1.charAt(seq1Pos--);
        seq2Final += sequence2.charAt(seq2Pos--);
    }

    this.seq1Final = seq1Final.split('').reverse().join('');
    this.seq2Final = seq2Final.split('').reverse().join('');

    }

}
