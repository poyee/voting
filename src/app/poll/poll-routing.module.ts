import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetPollComponent } from './get-poll/get-poll.component';

const routes: Routes = [
  {
    path: ':id',
    component: GetPollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule {}
