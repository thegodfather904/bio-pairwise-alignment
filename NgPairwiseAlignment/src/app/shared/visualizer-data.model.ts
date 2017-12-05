import { MatrixElement } from './matrix-element.model';

export class VisualizerData {
    public sequence1: string;
    public sequence2: string;
    public score: number;
    public gapPenalty: number;
    public seqMatch: number;
    public seqMismatch: number;
    public alignmentMatrix: MatrixElement[];
    public matrixElementWidth = '25%';
    public seq1Final: string;
    public seq2Final: string;

    constructor() {}
}
