import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Acknowledgement } from '../model/acknowledgement.model';
import { BaseService } from '../shared/service/base.service';

@Injectable()
export class PollService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  createPoll(poll: any): Observable<Acknowledgement> {
    return this.post(AppConstants.POLL_URI, poll);
  }

  getPoll(id: string): Observable<Acknowledgement> {
    const path = `${AppConstants.POLL_URI}/${id}`;

    return this.get(path);
  }

  vote(vote: any): Observable<Acknowledgement> {
    return this.post(AppConstants.VOTE_URI, vote);
  }
}
