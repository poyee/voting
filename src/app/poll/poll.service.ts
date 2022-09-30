import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';
import { Acknowledgement } from '../model/acknowledgement.model';
import { Comment } from '../model/poll/comment.model';
import { OptionRequest } from '../model/poll/option-request.model';
import { BaseService } from '../shared/service/base.service';
import {React, ReactType} from '../model/poll/react.model';

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

  createOption(pollId: string, optionRequest: OptionRequest): Observable<Acknowledgement> {
    const path = `${AppConstants.POLL_URI}/${pollId}/options`;

    return this.post(path, optionRequest);
  }

  vote(vote: any): Observable<Acknowledgement> {
    return this.post(AppConstants.VOTE_URI, vote);
  }

  comment(body: Comment): Observable<Acknowledgement> {
    return this.post(AppConstants.COMMENT_URI, body);
  }

  getComments(pollId: string): Observable<Acknowledgement> {
    const params = new HttpParams()
      .set('pollId', pollId);

    return this.get(AppConstants.COMMENT_URI, params);
  }

  getPollSummaries(page: number): Observable<Acknowledgement> {
    const params = new HttpParams()
      .set('page', page);

    return this.get(AppConstants.POLL_URI, params);
  }

  react(pollId: string, react: ReactType): Observable<Acknowledgement> {
    const body: React = {
      react: react,
    };

    const path = `${AppConstants.POLL_URI}/${pollId}/reacts`;

    return this.post(path, body);
  }

  deleteComment(id: number): Observable<Acknowledgement> {
    return this.delete(`${AppConstants.COMMENT_URI}/${id}`)
  }
}
