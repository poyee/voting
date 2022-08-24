import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Acknowledgement } from '../../model/acknowledgement.model';
import { httpHeaderOptions } from './http-header';

export class BaseService {
  constructor(protected readonly http: HttpClient) {
  }

  get(path: string, params?: HttpParams | null): Observable<Acknowledgement> {
    if (params) {
      return this.http.get<Acknowledgement>(path, {
        params
      });
    }

    return this.http.get<Acknowledgement>(path);
  }

  post(path: string, body: any | null): Observable<Acknowledgement> {
    return this.http.post<Acknowledgement>(
      path,
      body,
      httpHeaderOptions.httpJsonOptions
    );
  }

  postWithEmptyHeader(
    path: string,
    body: any | null
  ): Observable<Acknowledgement> {
    return this.http.post<Acknowledgement>(
      path,
      body,
      httpHeaderOptions.httpEmptyOptions
    );
  }

  put(path: string, body: any | null): Observable<Acknowledgement> {
    return this.http.put<Acknowledgement>(
      path,
      body,
      httpHeaderOptions.httpJsonOptions
    );
  }

  delete(path: string): Observable<Acknowledgement> {
    return this.http.delete<Acknowledgement>(path);
  }
}
