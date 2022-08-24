import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'votePercent'
})
export class VotePercentPipe implements PipeTransform {
  transform(votes: number, totalVotes: number): string {
    const res = `${votes / totalVotes * 100}%`;

    return res;
  }
}
