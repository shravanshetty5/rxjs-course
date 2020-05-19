import { Observable, Observer } from 'rxjs';
import { CourcesResponse } from '../app.types';

export const fetchDataFromUrl = (url: string): Observable<any> => Observable.create((observer: Observer<CourcesResponse>) => {
  const controller = new AbortController();
  const signal = controller.signal;
  fetch(url, {signal})
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        observer.error(`Request failed with status code: ${resp.status}`);
      }
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

