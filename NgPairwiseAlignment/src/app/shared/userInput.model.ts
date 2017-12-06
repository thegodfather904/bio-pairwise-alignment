import { AlignmentOptions } from './alignment-options.enum';

export class UserInput {
    public sequence1: string;
    public sequence2: string;
    public alignmentType: string;
    public gapPenalty: number;
    public seqMatch: number;
    public seqMismatch: number;
    public bandedAlignmentMax: number;

    constructor() {
        this.alignmentType = AlignmentOptions.GLOBAL;
        this.gapPenalty = -3;
        this.seqMatch = 1;
        this.seqMismatch = -1;
        this.bandedAlignmentMax = -20;
    }
}
