import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { GetPollComponent } from './get-poll/get-poll.component';
import { PollRoutingModule } from './poll-routing.module';
import { PollService } from './poll.service';
import { PollComponent } from './poll/poll.component';

@NgModule({
  declarations: [
    CreatePollComponent,
    GetPollComponent,
    PollComponent
  ],
  imports: [
        CommonModule,
        FormsModule,
        PollRoutingModule,
        ReactiveFormsModule,
        SharedModule
    ],
  providers: [
    PollService
  ]
})
export class PollModule {}
