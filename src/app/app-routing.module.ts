import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePollComponent } from './poll/create-poll/create-poll.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'poll/new',
    component: CreatePollComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [{
      path: 'poll',
      loadChildren: () =>
        import('./poll/poll.module')
          .then(m => m.PollModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
