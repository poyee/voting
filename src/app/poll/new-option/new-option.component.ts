import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OptionRequest } from '../../model/poll/option-request.model';
import { Poll } from '../../model/poll/poll.model';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-new-option',
  templateUrl: './new-option.component.html',
  styleUrls: ['./new-option.component.css']
})
export class NewOptionComponent implements OnInit {

  @Input() pollId: string;

  option: string;

  constructor(private readonly dialogRef: MatDialogRef<NewOptionComponent>,
              private readonly service: PollService) { }

  ngOnInit(): void {
  }

  onClickCancel(): void {
    this.dialogRef.close();
  }

  onClickCreate(): void {
    const body: OptionRequest = {
      option: this.option
    };

    this.service.createOption(this.pollId, body)
      .subscribe(result => {
        if (result.ok) {
          this.dialogRef.close();
        }
      });
  }
}
