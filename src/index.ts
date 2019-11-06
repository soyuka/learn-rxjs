import './style.css'
import { fromEvent, merge } from 'rxjs'
import { map, buffer, throttleTime, filter } from 'rxjs/operators'

var button = document.querySelector('.this');
var click$ = fromEvent(button, 'click');


// HERE
// The 4 lines of code that make the multi-click logic
// var multiClickStream = click$
//   .pipe(
//     buffer(function() { return click$.throttle(250); }),
//     map(function(list) { return list.length; }),
//     filter(function(x) { return x >= 2; })
//   )

// Same as above, but detects single clicks
var singleClickStream = click$
  .pipe(
    buffer(click$.pipe(throttleTime(250))),
    map(list => list.length),
    filter(x => x === 1)
  )

// Listen to both streams and render the text label accordingly
singleClickStream.subscribe(function (event) {
    document.querySelector('h2').textContent = 'click';
});
// multiClickStream.subscribe(function (numclicks) {
//     document.querySelector('h2').textContent = ''+numclicks+'x click';
// });

// merge(singleClickStream, multiClickStream)
//     .throttle(1000)
//     .subscribe(function (suggestion) {
//         document.querySelector('h2').textContent = '';
//     });


