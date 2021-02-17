export class Topic {
    id: number;
    title: string;
    daysForLearning: number;
    completed: boolean;
    startedOn: string;

    constructor(title: string, daysForLearning: number) {
        this.title = title;
        this.daysForLearning = daysForLearning;
    }
}