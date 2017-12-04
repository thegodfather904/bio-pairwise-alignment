import { MatrixElement } from './matrix-element.model';
import { VisualizerData } from './visualizer-data.model';
import { PlotValue } from './plot-value.model';

export class GlobalAlignment {
    constructor() {}

    private plotMatrix: PlotValue[];

    runGlobalAlignment(vd: VisualizerData): VisualizerData  {

        this.plotInit(vd.sequence1.length, vd.sequence2.length, vd.gapPenalty);

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

}
