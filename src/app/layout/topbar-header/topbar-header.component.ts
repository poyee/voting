import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/auth/user.model';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import {AuthUtils} from "../../shared/auth/auth.utils";

@Component({
  selector: 'app-topbar-header',
  templateUrl: './topbar-header.component.html',
  styleUrls: ['./topbar-header.component.css']
})
export class TopbarHeaderComponent implements OnInit {
  @Input() isMainLayout: boolean;

  menuOpen = false;
  isLoggedIn = false;
  user: User;

  constructor(private router: Router,
              private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.tokenStorage.getUser();
    }
  }

  onClickMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  onClickLogin(): void {
    this.router.navigateByUrl(AuthUtils.getLoginUri());
  }

  onUserEdit(user: User): void {
    this.user = user;
  }
}
