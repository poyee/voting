import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { DateTimeAgoPipe } from './pipe/datetime-ago.pipe';
import { VotePercentPipe } from './pipe/vote-percent.pipe';

@NgModule({
  declarations: [VotePercentPipe, DateTimeAgoPipe],
  exports: [
    VotePercentPipe,
    DateTimeAgoPipe
  ],
  imports: [
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule { }
