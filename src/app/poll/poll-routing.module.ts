import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPollComponent } from './get-poll/get-poll.component';
import { PollComponent } from './poll/poll.component';

const routes: Routes = [
  {
    path: ':id',
    component: PollComponent
  },
  {
    path: 'example',
    component: GetPollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule {}
