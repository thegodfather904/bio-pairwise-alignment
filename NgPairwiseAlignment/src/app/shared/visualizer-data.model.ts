import { MatrixElement } from './matrix-element.model';

export class VisualizerData {
    public sequence1: string;
    public sequence2: string;
    public score: number;
    public gapPenalty: number;
    public alignmentMatrix: MatrixElement[];

    constructor() {}
}
