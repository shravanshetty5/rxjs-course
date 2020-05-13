import { Observable, Observer } from 'rxjs';
import { CourcesResponse } from '../app.types';

export const fetchDataFromUrl = (url: string): Observable<CourcesResponse> => Observable.create((observer: Observer<CourcesResponse>) => {
  fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((body: CourcesResponse) => {
      observer.next(body);
      observer.complete();
    })
    .catch(err => {
      observer.error(err);
    });
});

