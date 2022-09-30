import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtResponse } from '../../model/auth/jwt-response.model';
import { CustomValidator } from '../../shared/custom.validator';
import { AuthService } from '../../shared/service/auth.service';
import { TokenStorageService } from '../../shared/service/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form = this.fb.group({
      email: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      password: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      matchPassword: ['', {
        validators: [Validators.required],
        updateOn: 'blur'
      }]
    },
    {validators: CustomValidator.MatchPasswordValidator('password', 'matchPassword')}
  );

  isSubmitted = false;

  constructor(private readonly fb: UntypedFormBuilder,
              private readonly router: Router,
              private readonly authService: AuthService,
              private readonly tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
  }

  onSignUp(): void {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.authService.register(this.form.value)
    }
  }

  login(jwtResponse: JwtResponse): void {
    this.tokenStorage.saveToken(jwtResponse.accessToken);
    this.tokenStorage.saveUser(jwtResponse.user);
  }

  get email(): UntypedFormControl {
    return this.form.controls['email'] as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.form.controls['password'] as UntypedFormControl;
  }

  get matchPassword(): UntypedFormControl {
    return this.form.controls['matchPassword'] as UntypedFormControl;
  }

  get passwordMatchError(): boolean {
    return this.form.hasError('misMatch') && this.matchPassword.touched;
  }
}
