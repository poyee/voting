import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { GetPollComponent } from './get-poll/get-poll.component';
import { PollRoutingModule } from './poll-routing.module';

@NgModule({
  declarations: [
    CreatePollComponent,
    GetPollComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PollRoutingModule
  ]
})
export class PollModule {}
