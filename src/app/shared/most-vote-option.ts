import {Option} from "../model/poll/option.model";

export class MostVoteOption {
  voteToOptionCount = new Map();

  constructor(options: Array<Option>) {
    const maxVoteCount: number = options
      .map(option => option.votes)
      .reduce((v1, v2) => v1 > v2 ? v1 : v2);

    // record vote count and the number of options
    // only option which has maxVoteCount, maxVoteCount+1 and maxVoteCount have chance to be mostVote
    for (let i = 1; i >= -1; i--) {
      const voteCount = maxVoteCount + i;
      this.voteToOptionCount.set(voteCount, options.filter(option => option.votes === voteCount).length);
    }
  }

  decrease(vote: number): void {
    this.adjust(vote, -1);
    this.adjust(vote-1, 1);
  }

  increase(vote: number): void {
    this.adjust(vote, -1);
    this.adjust(vote+1, 1);
  }

  private adjust(vote: number, delta: number): void {
    if (this.voteToOptionCount.has(vote)) {
      this.voteToOptionCount.set(vote, this.voteToOptionCount.get(vote) + delta);
    }
  }

  get mostVote(): number {
    for (const [key, value] of this.voteToOptionCount) {
      if (value > 0) {
        // mostVote can only have one
        if (value === 1) {
          return key;
        }

        return undefined;
      }
    }

    return undefined;
  }
}
