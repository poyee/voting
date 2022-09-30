import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { PaginationComponent } from './pagination/pagination.component';
import { DateTimeAgoPipe } from './pipe/datetime-ago.pipe';
import { VotePercentPipe } from './pipe/vote-percent.pipe';
import {CommonModule } from '@angular/common';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
@NgModule({
  declarations: [VotePercentPipe, DateTimeAgoPipe, PaginationComponent, UserAvatarComponent, ErrorMessageComponent],
    exports: [
        VotePercentPipe,
        DateTimeAgoPipe,
        PaginationComponent,
        UserAvatarComponent
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
