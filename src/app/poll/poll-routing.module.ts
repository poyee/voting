import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollComponent } from './poll/poll.component';
import { SearchPollsComponent } from './search-polls/search-polls.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPollsComponent
  },
  {
    path: ':id',
    component: PollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule {}
