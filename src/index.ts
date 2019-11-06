import './style.css'
import { fromEvent } from 'rxjs'
import { map, scan } from 'rxjs/operators'

var button = document.querySelector('.this');
var click$ = fromEvent(button, 'click');

var stream = click$.pipe(
    map(e => 1),
    scan((acc, curr) => acc + curr, 0)
)

stream.subscribe((count) => {
  document.querySelector('h2').textContent = `${count} times`;
})
