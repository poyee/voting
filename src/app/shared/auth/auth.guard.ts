import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot} from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthUtils } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    const isLoggedIn = this.tokenStorage.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigateByUrl(AuthUtils.getLoginUri());
    }

    return isLoggedIn;
  }
}
