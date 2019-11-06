// RxJS v6+
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

const getContinents = (keys: string) =>
  [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
  ].filter(e => e.indexOf(keys.toLowerCase()) > -1);

const fakeContinentsRequest = (keys: string) =>
  of(getContinents(keys)).pipe(
    tap(_ => console.log(`API CALL at ${new Date()}`))
  );

fromEvent(document.getElementById('type-ahead'), 'keyup')
  .pipe(
    debounceTime(200),
    map((e: any) => e.target.value),
    distinctUntilChanged(),
    switchMap(fakeContinentsRequest),
    tap(c => (document.getElementById('output').innerText = c.join('\n')))
  )
  .subscribe();
