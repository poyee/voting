import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../../app.constants';
import { Acknowledgement } from '../../model/acknowledgement.model';
import { LoginRequest } from '../../model/auth/login-request.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(request: LoginRequest): Observable<Acknowledgement> {
    const path = `${AppConstants.AUTH_URI}/login`;

    return this.post(path, request);
  }
}
