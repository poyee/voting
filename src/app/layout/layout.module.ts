import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopbarHeaderComponent } from './topbar-header/topbar-header.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { EditDisplayNameComponent } from './edit-display-name/edit-display-name.component';

@NgModule({
  declarations: [SideNavComponent, MainLayoutComponent, TopbarHeaderComponent, ProfileMenuComponent, EditDisplayNameComponent],
  exports: [SideNavComponent, TopbarHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class LayoutModule { }
