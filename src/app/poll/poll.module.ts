import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { NewOptionComponent } from './new-option/new-option.component';
import { PollRoutingModule } from './poll-routing.module';
import { PollService } from './poll.service';
import { PollComponent } from './poll/poll.component';
import { SearchPollsComponent } from './search-polls/search-polls.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    CreatePollComponent,
    PollComponent,
    NewOptionComponent,
    SearchPollsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PollRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    PollService
  ]
})
export class PollModule {}
