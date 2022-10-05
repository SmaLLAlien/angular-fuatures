import {Component, inject, Inject} from '@angular/core';
import {WINDOW} from "./window.token";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-features';

  constructor(@Inject(WINDOW) private window: Window) {
    const window2 = inject(WINDOW);
    console.log(this.window, 'window')
  }
}
