import { Component, OnInit } from '@angular/core';
import { Option } from '../../model/poll/poll.model';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.css']
})
export class CreatePollComponent implements OnInit {
  options: Array<Option> = [new Option(), new Option()];
  multiVote: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClickAddOption(): void {
    this.options.push(new Option());
  }

  onDismissOption(index: number): void {
    this.options.splice(index, 1);
  }

  onClickMultiVote(): void {
    this.multiVote = !this.multiVote;
    console.log(this.multiVote)
  }
}
