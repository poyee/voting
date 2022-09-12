import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce, interval, Subject } from 'rxjs';
import { Comment } from '../../model/poll/comment.model';
import { Option } from '../../model/poll/option.model';
import { Poll } from '../../model/poll/poll.model';
import { AuthUtils } from '../../shared/auth/auth.utils';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { NewOptionComponent } from '../new-option/new-option.component';
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

  comment: string;

  comments: Array<Comment>;

  constructor(private readonly route: ActivatedRoute,
              private readonly pollService: PollService,
              private readonly dialog: MatDialog,
              private readonly tokenService: TokenStorageService,
              private readonly router: Router) {
    this.subject.pipe(
      debounce(() => interval(500))
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
        this.loadComments();
      });
  }

  loadPoll(): void {
    this.pollService.getPoll(this.pollId)
      .subscribe(result => {
        if (result.ok) {
          this.poll = result.rtnObj as Poll;
          this.totalVotes = this.poll.options.map(option => option.votes)
            .reduce((v1, v2) => v1 + v2);

          if (this.poll.selectedOptions) {
            const voteNumber = this.poll.selectedOptions[0];

            this.selectedOption = this.poll.options.find(option => option.number === voteNumber);
            this.prevSelectedOption = this.selectedOption;
          }
        }
      });
  }

  loadComments(): void {
    this.pollService.getComments(this.pollId)
      .subscribe(result => {
        if (result.ok) {
          this.comments = result.rtnObj as Array<Comment>;
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

      if (this.selectedOption === option) { // unselected mode
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
      let optionNumbers: Array<number> = [];
      if (option) {
        optionNumbers = [option.number];
      }

      const vote = {
        pollId: this.pollId,
        optionNumbers
      };

      this.pollService.vote(vote)
        .subscribe();
      this.prevSelectedOption = option;
    }
  }

  get isSelected(): boolean {
    return this.selectedOption !== undefined;
  }

  onClickNewOption(): void {
    if (!this.tokenService.isLoggedIn()) {
      this.router.navigateByUrl(AuthUtils.getLoginUri());
    } else {

      const dialogRef = this.dialog.open(NewOptionComponent, {
        width: '250px',
        panelClass: 'voting-dialog-container'
      });

      dialogRef.afterClosed()
      .subscribe(() => this.loadPoll());

      dialogRef.componentInstance.pollId = this.pollId;
    }
  }

  onClickComment(): void {
    const body = new Comment();
    body.pollId = this.pollId;
    body.body = this.comment;

    this.pollService.comment(body)
      .subscribe(result => {
        if (result.ok) {
          this.comment = undefined;
          this.loadComments();
        }
      });
  }
}
