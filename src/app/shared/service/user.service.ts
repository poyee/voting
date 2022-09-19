import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../../app.constants';
import { Acknowledgement } from '../../model/acknowledgement.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getCurrentUser(): Observable<Acknowledgement> {
    return this.get(`${AppConstants.USER_URI}/me`);
  }

  editDisplayName(body: any): Observable<Acknowledgement> {
    return this.put(`${AppConstants.USER_URI}/name`, body);
  }
}
