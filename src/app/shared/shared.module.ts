import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PaginationComponent } from './pagination/pagination.component';
import { DateTimeAgoPipe } from './pipe/datetime-ago.pipe';
import { VotePercentPipe } from './pipe/vote-percent.pipe';
import {CommonModule} from "@angular/common";
@NgModule({
  declarations: [VotePercentPipe, DateTimeAgoPipe, PaginationComponent],
  exports: [
    VotePercentPipe,
    DateTimeAgoPipe,
    PaginationComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [
    AuthGuard
  ]
})
export class SharedModule { }
