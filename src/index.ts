import './style.css'
import { fromEvent, merge } from 'rxjs'
import { map, buffer, throttleTime, filter } from 'rxjs/operators'

var button = document.querySelector('.this')
var clicks$ = fromEvent(button, 'click')

var singleClickStream = clicks$
  .pipe(
    buffer(clicks$.pipe(throttleTime(250))),
    map(list => list.length),
    filter(x => x === 1)
  )

var multiClickStream = clicks$
  .pipe(
    buffer(clicks$.pipe(throttleTime(500))),
    map(list => list.length),
    filter(num => num > 1)
  )

singleClickStream.subscribe(function (event) {
    document.querySelector('h2').textContent = 'click'
});
multiClickStream.subscribe(function (numclicks) {
    document.querySelector('h2').textContent = `${numclicks}x click`
});
