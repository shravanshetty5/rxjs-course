import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export enum RxjsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let currentLoggingLevel = RxjsLoggingLevel.INFO;

export const setLoggingLevel = (loggingLevel: RxjsLoggingLevel) => {
  currentLoggingLevel = loggingLevel;
};

export const debug = (loggingLevel: RxjsLoggingLevel, msg: string ) =>
(source: Observable<any>) => source.pipe(
  tap((val) => {
    if (loggingLevel >= currentLoggingLevel) {
      console.log(`${msg}: ${JSON.stringify(val)}`);
    }
  })
);
