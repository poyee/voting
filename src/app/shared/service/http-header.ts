import { HttpHeaders } from '@angular/common/http';

export const httpHeaderOptions = {
  httpBlobOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/octet-stream'
    }),
    responseType: 'blob' as 'blob'
  },

  httpImageOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'image/*'
    }),
    responseType: 'blob' as 'blob'
  },

  httpFormOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    })
  },

  httpJsonOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  },

  httpEmptyOptions: {
    headers: new HttpHeaders({})
  }
};
