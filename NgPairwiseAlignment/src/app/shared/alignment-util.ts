import { MatrixElement } from './matrix-element.model';
import { PlotValue } from './plot-value.model';

export class AlignmentUtil {
  constructor() {}

  convertPlotMatrixToAlignmentMatrix(
    sequence1: string,
    sequence2: string,
    plotMatrix
  ): MatrixElement[] {
    const alignmentMatrix = Array<MatrixElement>();

    // set up first row with sequence 1 values
    alignmentMatrix.push(
      new MatrixElement('', 'sequence-value start-value first-row')
    );
    alignmentMatrix.push(new MatrixElement('-', 'sequence-value first-row'));
    for (let i = 0; i < sequence1.length; i++) {
      alignmentMatrix.push(
        new MatrixElement(sequence1.charAt(i), 'sequence-value first-row')
      );
    }

    const seq2WithFront = '-' + sequence2;

    for (let r = 0; r < sequence2.length + 1; r++) {
      alignmentMatrix.push(
        new MatrixElement(seq2WithFront.charAt(r), 'sequence-value start-value')
      );
      for (let c = 0; c < sequence1.length + 1; c++) {
        if (isNaN(plotMatrix[r][c].score)) {
          alignmentMatrix.push(
            new MatrixElement(
              '-',
              this.addInAlignmentClass(plotMatrix[r][c])
            )
          );
        } else {
          alignmentMatrix.push(
            new MatrixElement(
              plotMatrix[r][c].score,
              this.addInAlignmentClass(plotMatrix[r][c])
            )
          );
        }

      }
    }

    return alignmentMatrix;
  }

  addInAlignmentClass(pv: PlotValue): string {
    if (pv.inAlignment) {
        return 'in-alignment';
    } else {
        return '';
    }
}
}
