import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { VotePercentPipe } from './pipe/vote-percent.pipe';

@NgModule({
  declarations: [VotePercentPipe],
  exports: [
    VotePercentPipe
  ],
  imports: [
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule { }
