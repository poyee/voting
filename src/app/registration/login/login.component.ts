import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from '../../app.constants';
import { TokenStorageService } from '../../shared/service/token-storage.service';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  googleURL = AppConstants.GOOGLE_AUTH_URL;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private readonly tokenStorage: TokenStorageService,
              private readonly userService: UserService) { }

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParamMap.get('token');
    const redirectUrl: string = this.route.snapshot.queryParamMap.get('redirectUrl');

    if (token) {
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser()
        .subscribe(result => {
          if (result.ok) {
            const navigateUrl = redirectUrl === undefined ? redirectUrl : 'poll';
            this.router.navigateByUrl(navigateUrl);
          }
        });
    }
  }

  googleLogin(): void {
    window.location.href = `${this.googleURL}?redirect_uri=${window.location.href}`;
  }
}
