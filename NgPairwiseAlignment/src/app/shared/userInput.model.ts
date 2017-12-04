import { AlignmentOptions } from './alignment-options.enum';

export class UserInput {
    public sequence1: string;
    public sequence2: string;
    public alignmentType: string;
    public gapPenalty: number;

    constructor() {
        this.alignmentType = AlignmentOptions.GLOBAL;
        this.gapPenalty = -3;
    }
}
