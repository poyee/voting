import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterModule, RouterStateSnapshot, Routes} from '@angular/router';
import {PollComponent } from './poll/poll.component';
import {SearchPollsComponent } from './search-polls/search-polls.component';
import {Poll} from "../model/poll/poll.model";
import {PollService} from "./poll.service";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PollResolver implements Resolve<Poll> {
  constructor(private service: PollService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const pollId = route.paramMap.get('id');
    if (pollId) {
      return this.service.getPoll(pollId).pipe(
        map(result => result.rtnObj as Poll),
        catchError(err => {
          this.redirect();
          return throwError(err);
        })
      )
    } else {
      this.redirect()
      return null;
    }
  }

  redirect(): void {
    setTimeout(() => {
      this.router.navigate(['/poll']);
    }, 500)
  }

}

const routes: Routes = [
  {
    path: '',
    component: SearchPollsComponent
  },
  {
    path: ':id',
    component: PollComponent,
    resolve: { poll: PollResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule {}
