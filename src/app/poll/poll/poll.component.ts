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
import { ReactType} from "../../model/poll/react.model";
import {AbstractControl, FormBuilder, FormControl, Validators} from "@angular/forms";
import {CustomValidator} from "../../shared/custom.validator";
import {MostVoteOption} from "../../shared/most-vote-option";
import {ErrorMessageComponent} from "../../shared/error-message/error-message.component";

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
  voteSubject = new Subject<Option>();

  commentForm = this.fb.group({
    comment: ['', {
      validators: [Validators.required, CustomValidator.OnlyWhiteSpaceValidator(), Validators.maxLength(200)],
      updateOn: 'blur'
    }],
    anonymous: [false]
  });

  isSubmitComment: boolean;

  comments: Array<Comment>;

  reactType = Object.values(ReactType);
  userReact: ReactType
  prevReact: ReactType
  reactSubject = new Subject<ReactType>();

  mostVoteOption: MostVoteOption;

  constructor(private readonly route: ActivatedRoute,
              private readonly pollService: PollService,
              private readonly dialog: MatDialog,
              private readonly tokenService: TokenStorageService,
              private readonly router: Router,
              private readonly fb: FormBuilder) {
    this.voteSubject.pipe(
      debounce(() => interval(500))
    )
      .subscribe(option => {
        this.vote(option);
      });

    this.reactSubject.pipe(
      debounce(() => interval(500))
    )
      .subscribe(react => {
        this.react(react);
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
    this.poll = this.route.snapshot.data['poll'];


          this.mostVoteOption = new MostVoteOption(this.poll.options);

          this.totalVotes = this.poll.options.map(option => option.votes)
            .reduce((v1, v2) => v1 + v2);

          if (this.poll.selectedOptions) {
            const voteNumber = this.poll.selectedOptions[0];

            this.selectedOption = this.poll.options.find(option => option.number === voteNumber);
            this.prevSelectedOption = this.selectedOption;
          }

          if (this.poll.userReact) {
            this.userReact = this.poll.userReact;
            this.prevReact = this.userReact;
          }
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
    this.adjustMostVote(option);

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

    this.voteSubject.next(this.selectedOption);
  }

  adjustMostVote(option: Option): void {
    if (this.selectedOption === undefined) {
      this.mostVoteOption.increase(option.votes);
    } else {
      if (this.selectedOption !== option) {
        this.mostVoteOption.increase(option.votes);
      }

      this.mostVoteOption.decrease(this.selectedOption.votes);
    }
  }

  get mostVote(): number {
    return this.mostVoteOption.mostVote;
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
    if (this.commentForm.invalid) {
      this.isSubmitComment = true;
      return;
    }

    const body = new Comment();
    body.pollId = this.pollId;
    body.body = this.commentForm.controls['comment'].value;
    body.anonymous = this.commentForm.controls['anonymous'].value;

    this.pollService.comment(body)
      .subscribe(result => {
        if (result.ok) {
          this.commentForm.controls['comment'].setValue('')
          this.loadComments();
        }
      });
  }

  get commentBody(): AbstractControl {
    return this.commentForm.controls['comment'];
  }

  onClickReact(react: ReactType) {
    if (this.userReact === undefined) {
      this.userReact = react;
      this.poll.reactCount[react]++;
    } else {
      this.poll.reactCount[this.userReact]--;

      if (this.userReact === react) { // unselected mode
        this.userReact = undefined;
      } else { // select new option
        this.userReact = react;
        this.poll.reactCount[react]++;
      }
    }

    this.reactSubject.next(this.userReact)
  }

  private react(react: ReactType) {
    if (react !== this.prevReact) {


      this.pollService.react(this.pollId, react)
        .subscribe();
      this.prevReact = react;
    }
  }

  deleteComment(id: number): void {
    this.pollService.deleteComment(id)
      .subscribe(result => {
        if (result.ok) {
          this.loadComments();
        }
      },
        error => {
            const dialogRef = this.dialog.open(ErrorMessageComponent, {
              width: '250px',
              panelClass: 'voting-dialog-container',
              autoFocus: false
            });

          dialogRef.componentInstance.message = error.error.errorMsg;
        })
  }
}
