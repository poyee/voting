import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounce, interval, Subject } from 'rxjs';
import { Option } from '../../model/poll/option.model';
import { Poll } from '../../model/poll/poll.model';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  pollId: string;
  poll: Poll;
  selectedOption: Option = undefined;
  prevSelectedOption: Option = undefined;
  totalVotes = 0;
  subject = new Subject<Option>();

  comments: Array<any> = [
    {
      user: '王小明',
      comment: 'Too Long',
      options: [1, 2]
    },
    {
      user: '李大屌',
      comment: '再怎麼長都沒有我的屌長',
      options: [4]
    }
  ];

  constructor(private readonly route: ActivatedRoute,
              private readonly pollService: PollService) {
    this.subject.pipe(
      debounce(() => interval(1000))
    )
      .subscribe(option => {
        this.vote(option);
      });
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.pollId = params.get('id');
        this.loadPoll();
      });
  }

  loadPoll(): void {
    this.pollService.getPoll(this.pollId)
      .subscribe(result => {
        if (result.ok) {
          this.poll = result.rtnObj as Poll;
          this.totalVotes = this.poll.options.map(option => option.votes).reduce((v1, v2) => v1 + v2);
        }
      });
  }

  onClickOption(option: Option): void {
    if (this.selectedOption === undefined) {
      this.selectedOption = option;
      this.selectedOption.votes++;
      this.totalVotes++;
    } else {
      this.selectedOption.votes--;

      // unselected mode
      if (this.selectedOption === option) {
        this.selectedOption = undefined;
        this.totalVotes--;
      } else { // select new option
        this.selectedOption = option;
        this.selectedOption.votes++;
      }
    }

    this.subject.next(this.selectedOption);
  }

  vote(option: Option): void {
    if (option !== this.prevSelectedOption) {
      if (option) {
        if (option !== this.prevSelectedOption) {
          this.prevSelectedOption = option;

          const vote = {
            pollId: this.pollId,
            optionNumbers: [option.number]
          };
          this.pollService.vote(vote)
            .subscribe();
        }
      } else {
        //TODO: unvote
      }

      this.prevSelectedOption = option;
    }
  }

  get isSelected(): boolean {
    return this.selectedOption !== undefined;
  }
}
