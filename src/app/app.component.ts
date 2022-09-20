import {Component, OnInit} from '@angular/core';
import {
  animationFrameScheduler,
  asapScheduler,
  asyncScheduler,
  delay,
  interval,
  Observable,
  observeOn,
  of,
  take
} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  progress$: Observable<number> | undefined
  progress2$: Observable<number> | undefined

  ngOnInit(): void {
    this.progress$ = interval(1000 / 60).pipe(take(100))
    this.progress2$ = interval(0, animationFrameScheduler).pipe(take(100))
  }

  runAsync(): void {
    console.log("Regular console log");
    requestAnimationFrame (() => console.log("Animation frame callback"));
    setTimeout(() => console.log("setTimeout callback"), 0);
    Promise.resolve("Promise value").then(console.log);

    of("Stream value").subscribe(console.log);

    of("Stream value").pipe(observeOn(asyncScheduler)).subscribe(console.log);
    of("Stream value").pipe(delay(0, asyncScheduler)).subscribe(console.log);

    of("Stream value").pipe(observeOn(asapScheduler)).subscribe(console.log);
    of("Stream value").pipe(delay(0, asapScheduler)).subscribe(console.log);
  }
}
