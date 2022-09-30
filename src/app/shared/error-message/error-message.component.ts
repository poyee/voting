import {Component, Input} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {PollService} from "../../poll/poll.service";
import {OptionRequest} from "../../model/poll/option-request.model";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent  {
  @Input() message: string;


  constructor(private readonly dialogRef: MatDialogRef<ErrorMessageComponent>) { }

  onClickConfirm(): void {
    this.dialogRef.close();
  }
}
