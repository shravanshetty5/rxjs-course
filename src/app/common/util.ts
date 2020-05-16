import { Observable, Observer } from 'rxjs';
import { CourcesResponse } from '../app.types';

export const fetchDataFromUrl = (url: string): Observable<CourcesResponse> => Observable.create((observer: Observer<CourcesResponse>) => {
  const controller = new AbortController();
  const signal = controller.signal;
  fetch(url, {signal})
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

    return () => controller.abort();
});

