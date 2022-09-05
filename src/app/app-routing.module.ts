import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CreatePollComponent } from './poll/create-poll/create-poll.component';
import { LoginComponent } from './registration/login/login.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'poll/new',
    component: CreatePollComponent,
    canActivate: [AuthGuard]
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
